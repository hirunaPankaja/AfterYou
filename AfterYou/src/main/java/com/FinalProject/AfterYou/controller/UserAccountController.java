package com.FinalProject.AfterYou.controller;


import com.FinalProject.AfterYou.model.UserAccount;
import com.FinalProject.AfterYou.service.UserAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-account")
public class UserAccountController {

    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @PostMapping("/add-primary")
    public UserAccount addPrimaryAccount(@RequestParam String email) {
        return userAccountService.addPrimaryAccount(email);
    }

    @PostMapping("/add-linked")
    public UserAccount addLinkedAccount(
            @RequestParam String email,
            @RequestParam String platform,
            @RequestParam String username,
            @RequestParam String profileUrl,
            @RequestParam String actionType) {
        return userAccountService.addLinkedAccount(email, platform, username, profileUrl, actionType);
    }

    @GetMapping("/primary")
    public List<UserAccount> getPrimaryAccounts() {
        return userAccountService.getPrimaryAccounts();
    }

    @GetMapping("/linked/{email}")
    public List<UserAccount> getLinkedAccounts(@PathVariable String email) {
        return userAccountService.getLinkedAccountsByEmail(email);
    }
}
