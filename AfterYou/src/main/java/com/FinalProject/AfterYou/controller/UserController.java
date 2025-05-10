package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.UserRegistrationRequest;
import com.FinalProject.AfterYou.DTO.UserRegistrationResponse;
import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserRegistrationResponse> register(@RequestBody UserRegistrationRequest request) {
        return ResponseEntity.ok(service.register(request));
    }



    @PostMapping("/login")
    public String login(@RequestBody UserCredentials user){
        System.out.println(user);
        return service.verify(user);
    }
}
