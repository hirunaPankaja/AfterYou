package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import com.FinalProject.AfterYou.util.AESEncryptionUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrimaryAccountService {

    private final PrimaryAccountRepository primaryAccountRepository;

    public PrimaryAccountService(PrimaryAccountRepository primaryAccountRepository) {
        this.primaryAccountRepository = primaryAccountRepository;
    }

    public PrimaryAccount addPrimaryAccount(Long userId, String email, String password, String recoveryCode) {
        // ✅ Check if email already exists
        Optional<PrimaryAccount> existingAccount = primaryAccountRepository.findByEmail(email);
        if (existingAccount.isPresent()) {
            throw new RuntimeException("Email already registered: " + email);
        }

        // 🔐 Encrypt password using AES
        String encryptedPassword = AESEncryptionUtil.encrypt(password);

        PrimaryAccount primaryAccount = new PrimaryAccount(userId, email, encryptedPassword, recoveryCode);
        return primaryAccountRepository.save(primaryAccount);
    }

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
