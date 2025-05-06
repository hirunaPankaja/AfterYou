package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    private BCryptPasswordEncoder encorder = new BCryptPasswordEncoder(12);
    public UserCredentials register(UserCredentials user){
          user.setPassword(encorder.encode(user.getPassword()));
          return repo.save(user);
    }
}
