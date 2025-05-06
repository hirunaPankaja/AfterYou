package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/register")
    public UserCredentials register(@RequestBody UserCredentials user){
        return service.register(user);
    }
}
