package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.service.PrimaryAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController

public class PrimaryAccountController {

    private final PrimaryAccountService primaryAccountService;

    public PrimaryAccountController(PrimaryAccountService primaryAccountService) {
        this.primaryAccountService = primaryAccountService;
    }

    // ✅ Add Primary Account with Password and Recovery Code
    @PostMapping("/add-primary")
    public PrimaryAccount addPrimaryAccount(@RequestBody int userId, @RequestBody String email, @RequestBody String password, @RequestBody String recoveryCode) {
        UserRegistrationDetails user = new UserRegistrationDetails();
        user.setUserId(userId);
        return primaryAccountService.addPrimaryAccount(user, email, password, recoveryCode);
    }

    // ✅ Get Primary Account by Email
    @GetMapping("/primary/{email}")
    public Optional<PrimaryAccount> getPrimaryAccount(@PathVariable String email) {
        return primaryAccountService.getPrimaryAccount(email);
    }
}
