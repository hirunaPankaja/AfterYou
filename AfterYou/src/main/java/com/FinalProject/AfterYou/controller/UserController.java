package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.*;
import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponse> register(@RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(service.register(request));
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredentials user){
        LoginResponse response = service.verify(user);

        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    @PostMapping("/profile") // change to POST because you're using @RequestBody
    public ResponseEntity<UserProfileDto> getUserProfile(@RequestBody UserIdRequest request) {
        try {
            UserProfileDto userProfile = service.getUserProfile(request.getUserId());
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
