package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrimaryAccountService {

    private final PrimaryAccountRepository primaryAccountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public PrimaryAccountService(PrimaryAccountRepository primaryAccountRepository) {
        this.primaryAccountRepository = primaryAccountRepository;
    }

    // ✅ Add Primary Account with Hashed Password and Recovery Code
    public PrimaryAccount addPrimaryAccount(UserRegistrationDetails user, String email, String password, String recoveryCode) {
        PrimaryAccount account = new PrimaryAccount(user, email, passwordEncoder.encode(password), recoveryCode);
        return primaryAccountRepository.save(account);
    }

    // ✅ Get Primary Account by Email
    public Optional<PrimaryAccount> getPrimaryAccount(String email) {
        return primaryAccountRepository.findByEmail(email);
    }
}
