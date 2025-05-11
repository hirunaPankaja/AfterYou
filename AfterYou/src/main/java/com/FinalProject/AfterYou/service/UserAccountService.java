package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.UserAccount;
import com.FinalProject.AfterYou.model.AccountType;
import com.FinalProject.AfterYou.repo.UserAccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    // ✅ Add Primary Account with Hashed Password and Recovery Code
    public UserAccount addPrimaryAccount(String email, String password, String recoveryCode) {
        UserAccount account = new UserAccount();
        account.setEmail(email);
        account.setAccountType(AccountType.PRIMARY);
        account.setPassword(passwordEncoder.encode(password)); // Hash password before storing
        account.setRecoveryCode(recoveryCode);
        return userAccountRepository.save(account);
    }

    // ✅ Get Primary Account by Email
    public Optional<UserAccount> getPrimaryAccount(String email) {
        return userAccountRepository.findByEmailAndAccountType(email, AccountType.PRIMARY);
    }
}
