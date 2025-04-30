package com.finalProject.AfterYou.service;

import com.finalProject.AfterYou.model.User;
import com.finalProject.AfterYou.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean verifyPassword(String raw, String hashed) {
        return encoder.matches(raw, hashed);
    }
}