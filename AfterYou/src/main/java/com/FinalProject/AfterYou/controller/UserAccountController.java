package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.UserAccount;
import com.FinalProject.AfterYou.service.UserAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user-account")
public class UserAccountController {

    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    // ✅ Add Primary Account with Password and Recovery Code
    @PostMapping("/add-primary")
    public UserAccount addPrimaryAccount(@RequestParam String email, @RequestParam String password, @RequestParam String recoveryCode) {
        return userAccountService.addPrimaryAccount(email, password, recoveryCode);
    }

    // ✅ Get Primary Account by Email
    @GetMapping("/primary/{email}")
    public Optional<UserAccount> getPrimaryAccount(@PathVariable String email) {
        return userAccountService.getPrimaryAccount(email);
    }
}
