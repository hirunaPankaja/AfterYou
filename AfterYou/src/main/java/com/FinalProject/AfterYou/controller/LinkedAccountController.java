package com.FinalProject.AfterYou.controller;


import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.service.LinkedAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-account")
public class LinkedAccountController {

    private final LinkedAccountService linkedAccountService;

    public LinkedAccountController(LinkedAccountService linkedAccountService) {
        this.linkedAccountService = linkedAccountService;
    }

    // ✅ Add Linked Account
    @PostMapping("/add-linked")
    public LinkedAccount addLinkedAccount(@RequestParam Long primaryId, @RequestParam String platform, @RequestParam String username, @RequestParam String profileUrl, @RequestParam String actionType) {
        return linkedAccountService.addLinkedAccount(primaryId, platform, username, profileUrl, actionType);
    }

    // ✅ Get Linked Accounts by Primary ID
    @GetMapping("/linked/{primaryId}")
    public List<LinkedAccount> getLinkedAccounts(@PathVariable Long primaryId) {
        return linkedAccountService.getLinkedAccounts(primaryId);
    }
}
