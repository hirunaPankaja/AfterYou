package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrimaryAccountService {

    private final PrimaryAccountRepository primaryAccountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public PrimaryAccountService(PrimaryAccountRepository primaryAccountRepository) {
        this.primaryAccountRepository = primaryAccountRepository;
    }

    public PrimaryAccount addPrimaryAccount(Long userId, String email, String password, String recoveryCode) {
        // ✅ Check if email already exists
        Optional<PrimaryAccount> existingAccount = primaryAccountRepository.findByEmail(email);
        if (existingAccount.isPresent()) {
            throw new RuntimeException("Email already registered: " + email);
        }

        PrimaryAccount primaryAccount = new PrimaryAccount(userId, email, password, recoveryCode);
        return primaryAccountRepository.save(primaryAccount);
    }

    // ✅ Get Primary Account by Email
    public Optional<PrimaryAccount> getPrimaryAccount(String email) {
        return primaryAccountRepository.findByEmail(email);
    }

    public PrimaryAccount getPrimaryAccountById(Long id) {
        return primaryAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Primary account not found with ID: " + id));
    }

    public List<PrimaryAccount> getAllPrimaryAccounts() {
        return primaryAccountRepository.findAll();
    }

}
