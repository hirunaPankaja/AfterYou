package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.LoginResponse;
import com.FinalProject.AfterYou.DTO.UserProfileDto;
import com.FinalProject.AfterYou.DTO.UserRegistrationRequest;
import com.FinalProject.AfterYou.DTO.UserRegistrationResponse;
import com.FinalProject.AfterYou.model.*;
import com.FinalProject.AfterYou.repo.UserDetailsRepo;
import com.FinalProject.AfterYou.repo.UserIdentityRepo;
import com.FinalProject.AfterYou.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public UserRegistrationResponse register(UserRegistrationRequest request) {
        UserRegistrationDetails user = request.getUserBasicInfo();

        // Link the credentials
        if (request.getCredentials() != null) {
            UserCredentials credentials = request.getCredentials();
            credentials.setUser(user);
            credentials.setPassword(encoder.encode(credentials.getPassword()));
            user.setCredentials(credentials);
        }

        // Link account security
        if (request.getAccountSecurity() != null) {
            UserAccountSecurity security = request.getAccountSecurity();
            security.setUser(user);
            user.setAccountSecurity(security);
        }

        // Link identity
        if (request.getIdentity() != null) {
            UserIdentity identity = request.getIdentity();
            identity.setUser(user);
            user.setUserIdentity(identity);
        }

        // Save with cascading
        UserRegistrationDetails savedUser = userDetails.save(user);

        // Send verification email
        String verificationUrl = "http://localhost:8081/verify?email=" + user.getCredentials().getEmail();
        try {
            emailService.sendVerificationEmail(savedUser.getCredentials().getEmail(), verificationUrl);
        } catch (Exception e) {
            throw new RuntimeException("Email could not be sent", e);
        }

        // Build response DTO (must be after email is sent)
        UserRegistrationResponse response = new UserRegistrationResponse();
        response.setUserId(savedUser.getUserId());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setEmail(savedUser.getCredentials().getEmail());
        response.setMessage("Registration successful. Verification email sent.");

        return response;
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

        if (registrationDetailsOpt.isPresent()/* && identityOpt.isPresent()*/) {
            UserRegistrationDetails registrationDetails = registrationDetailsOpt.get();

            String nic = userIdentityRepo.getNicByUserId(userId);
            String email = userRepo.getEmailByUserId(userId);

            // Map the data to a DTO for returning to the client
            return new UserProfileDto(
                    registrationDetails.getFirstName(),
                    registrationDetails.getLastName(),
                    email,
                    registrationDetails.getGender(),
                    registrationDetails.getDOB(),
                    registrationDetails.getAddress(),
                    registrationDetails.getPhoneNumber(),
                    nic

            );
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public boolean verifyEmail(String email) {
        UserCredentials user = userRepo.findByEmail(email);
        if (user != null) {
            user.setVerified(true); // Add this field in your model if not exists
            userRepo.save(user);
            return true;
        }
        return false;
    }

}
