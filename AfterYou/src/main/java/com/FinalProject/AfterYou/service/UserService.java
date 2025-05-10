package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.UserRegistrationRequest;
import com.FinalProject.AfterYou.DTO.UserRegistrationResponse;
import com.FinalProject.AfterYou.model.*;
import com.FinalProject.AfterYou.repo.UserDetailsRepo;
import com.FinalProject.AfterYou.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserDetailsRepo userDetails;

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

        // Build response DTO
        UserRegistrationResponse response = new UserRegistrationResponse();
        response.setUserId(savedUser.getUserId());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setEmail(savedUser.getCredentials().getEmail());
        response.setMessage("Registration successful");

        return response;
    }

    public String verify(UserCredentials user) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getEmail());
        }
        return "fail";
    }
}
