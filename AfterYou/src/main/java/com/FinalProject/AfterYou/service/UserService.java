package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.*;
import com.FinalProject.AfterYou.model.*;
import com.FinalProject.AfterYou.repo.UserRepo;
import com.FinalProject.AfterYou.repo.UserDetailsRepo;
import com.FinalProject.AfterYou.repo.UserIdentityRepo;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserDetailsRepo userDetails;

    @Autowired
    private UserIdentityRepo userIdentityRepo;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    private ConcurrentHashMap<String, UserCredentials> temporaryEmailVerification = new ConcurrentHashMap<>();

    public UserRegistrationResponse register(UserRegistrationRequest request) {
        UserRegistrationDetails user = request.getUserBasicInfo();

        if (user != null && user.getCredentials() != null) {
            UserCredentials credentials = user.getCredentials();

            // Temporarily store the credentials before verification
            temporaryEmailVerification.put(credentials.getEmail(), credentials);

            // Build a verification URL
            String verificationUrl = "http://localhost:8081/verify?email=" + credentials.getEmail();
            try {
                emailService.sendVerificationEmail(credentials.getEmail(), verificationUrl);
            } catch (Exception e) {
                throw new RuntimeException("Email could not be sent", e);
            }
        } else {
            throw new RuntimeException("Invalid registration data. Missing credentials.");
        }

        // Return a response message to the user
        UserRegistrationResponse response = new UserRegistrationResponse();
        response.setMessage("Registration successful. Verification email sent.");
        return response;
    }


    public boolean verifyEmail(String email) {
        // Retrieve temporarily stored credentials
        UserCredentials credentials = temporaryEmailVerification.get(email);

        if (credentials != null) {
            // Remove from temporary map after verification
            temporaryEmailVerification.remove(email);

            // Get the associated user info
            UserRegistrationDetails user = credentials.getUser();
            if (user == null) {
                throw new RuntimeException("User details missing for this email.");
            }

            // Encrypt password
            credentials.setPassword(encoder.encode(credentials.getPassword()));

            // Set bidirectional reference
            user.setCredentials(credentials);  // optional if you're using mappedBy with cascade
            credentials.setUser(user);         // ensure this is set before saving

            // Save user first (which should cascade to credentials if mapped)
            userDetails.save(user);            // Assuming cascade = CascadeType.ALL is set

            return true;
        }

        return false;
    }


    public LoginResponse verify(UserCredentials user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserCredentials dbUser = userRepo.findByEmail(user.getEmail());

            if (dbUser != null && dbUser.getUser() != null) {
                String token = jwtService.generateToken(user.getEmail());
                int userId = dbUser.getUser().getUserId();
                return new LoginResponse(token, userId);
            }
        }

        return null; // or throw an exception or return a response indicating failure
    }

    public UserProfileDto getUserProfile(int userId) {
        // Retrieve user registration details using the userId
        Optional<UserRegistrationDetails> registrationDetailsOpt = userDetails.findById(userId);

        if (registrationDetailsOpt.isPresent()) {
            UserRegistrationDetails registrationDetails = registrationDetailsOpt.get();
            String nic = userIdentityRepo.getNicByUserId(userId);
            String email = userRepo.getEmailByUserId(userId);

            return new UserProfileDto(
                    registrationDetails.getFirstName(),
                    registrationDetails.getLastName(),
                    email,
                    registrationDetails.getGender(),
                    registrationDetails.getDOB(),
                    registrationDetails.getAddress(),
                    registrationDetails.getPhoneNumber(),
                    nic,
                    registrationDetails.getProfilePic()
            );
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public void updateProfilePicture(int userId, MultipartFile profilePic) throws IOException {
        // Retrieve the user and update the profile picture
        UserRegistrationDetails user = userDetails.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setProfilePic(profilePic.getBytes());
        userDetails.save(user);
    }

    public boolean changePassword(String email, ChangePasswordRequest request) {
        // Validate new password and confirm password match
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        // Validate password complexity
        validatePassword(request.getNewPassword());

        // Get user credentials
        UserCredentials credentials = userRepo.findByEmail(email);
        if (credentials == null) {
            throw new RuntimeException("User not found");
        }

        // Verify current password
        if (!encoder.matches(request.getCurrentPassword(), credentials.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update password
        credentials.setPassword(encoder.encode(request.getNewPassword()));
        userRepo.save(credentials);

        return true;
    }

    private void validatePassword(String password) {
        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        // Add more complexity rules if needed
        if (!password.matches(".*[A-Z].*")) {
            throw new RuntimeException("Password must contain at least one uppercase letter");
        }

        if (!password.matches(".*[a-z].*")) {
            throw new RuntimeException("Password must contain at least one lowercase letter");
        }

        if (!password.matches(".*\\d.*")) {
            throw new RuntimeException("Password must contain at least one digit");
        }

        if (!password.matches(".*[!@#$%^&*()].*")) {
            throw new RuntimeException("Password must contain at least one special character");
        }
    }

    @Value("${password.reset.code.expiry:300000}") // 5 minutes default
    private long passwordResetCodeExpiry;

    private ConcurrentHashMap<String, PasswordResetData> passwordResetCodes = new ConcurrentHashMap<>();

    @Data
    @AllArgsConstructor
    private static class PasswordResetData {
        private String code;
        private long expiryTime;
        private String email;
    }

    public void initiatePasswordReset(ForgotPasswordRequest request) {
        String email = request.getEmail();
        UserCredentials user = userRepo.findByEmail(email);

        if (user == null) {
            return;
        }

        String code = String.format("%05d", new Random().nextInt(100000));
        long expiryTime = System.currentTimeMillis() + passwordResetCodeExpiry;

        passwordResetCodes.put(email, new PasswordResetData(code, expiryTime, email));

        try {
            emailService.sendVerificationCode(email, code); // Fixed call
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    public void verifyAndResetPassword(VerifyCodeRequest request) {
        // Validate passwords match
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        PasswordResetData resetData = passwordResetCodes.get(request.getEmail());

        // Check if code exists and isn't expired
        if (resetData == null || System.currentTimeMillis() > resetData.getExpiryTime()) {
            throw new RuntimeException("Invalid or expired verification code");
        }

        // Verify code matches
        if (!resetData.getCode().equals(request.getCode())) {
            throw new RuntimeException("Invalid verification code");
        }

        // Update password
        UserCredentials user = userRepo.findByEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepo.save(user);

        // Remove used code
        passwordResetCodes.remove(request.getEmail());
    }
}