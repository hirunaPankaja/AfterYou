package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.*;
import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.repo.UserDetailsRepo;
import com.FinalProject.AfterYou.service.EmailService;
import com.FinalProject.AfterYou.service.JWTService;
import com.FinalProject.AfterYou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserDetailsRepo userDetails;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponse> register(@RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials user) {
        LoginResponse response = service.verify(user);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<UserProfileDto> getUserProfile(@RequestBody UserIdRequest request) {
        try {
            UserProfileDto userProfile = service.getUserProfile(request.getUserId());
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String email) {
        boolean verified = service.verifyEmail(email);
        if (verified) {
            return ResponseEntity.status(302)
                    .header("Location", "http://localhost:5173/login/user")
                    .build();
        } else {
            return ResponseEntity.status(400).body("Invalid verification request");
        }
    }

    @PutMapping(value = "/updateProfile/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @PathVariable int userId,
            @RequestPart(required = false) MultipartFile profilePic,
            @RequestPart(required = false) String address,
            @RequestPart(required = false) String mobile) {

        Optional<UserRegistrationDetails> optionalUser = userDetails.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        UserRegistrationDetails user = optionalUser.get();

        if (address != null) {
            user.setAddress(address);
        }

        if (mobile != null) {
            user.setPhoneNumber(mobile);
        }

        if (profilePic != null && !profilePic.isEmpty()) {
            try {
                user.setProfilePic(profilePic.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading image.");
            }
        }

        userDetails.save(user);
        return ResponseEntity.ok("User updated successfully.");
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            @RequestHeader("Authorization") String authHeader) {

        try {
            // Extract JWT token from header
            String jwtToken = authHeader.substring(7); // Remove "Bearer " prefix

            // Get email from JWT
            String email = jwtService.extractUserName(jwtToken);

            // Change password
            boolean success = service.changePassword(email, request);

            if (success) {
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password change failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            service.initiatePasswordReset(request);
            return ResponseEntity.ok().body(Map.of(
                    "message", "If an account exists with this email, a verification code has been sent"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody VerifyCodeRequest request) {
        try {
            service.verifyAndResetPassword(request);
            return ResponseEntity.ok().body(Map.of(
                    "message", "Password has been reset successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }
}