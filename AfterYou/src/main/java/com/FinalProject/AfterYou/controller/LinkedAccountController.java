package com.FinalProject.AfterYou.controller;


import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.service.LinkedAccountService;
import com.FinalProject.AfterYou.service.PrimaryAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/linked-account")
public class LinkedAccountController {

    private final LinkedAccountService linkedAccountService;
    private final PrimaryAccountService primaryAccountService;

    public LinkedAccountController(LinkedAccountService linkedAccountService, PrimaryAccountService primaryAccountService) {
        this.linkedAccountService = linkedAccountService;
        this.primaryAccountService = primaryAccountService;
    }

    // ✅ Fix: Fetch PrimaryAccount before creating LinkedAccount
    @PostMapping("/add")
    public LinkedAccount addLinkedAccount(@RequestBody LinkedAccount linkedAccount) {
        Long primaryId = linkedAccount.getPrimaryAccount().getPrimaryId(); // ✅ Get ID instead of email
        return linkedAccountService.addLinkedAccount(
                primaryId,
                linkedAccount.getPlatform(),
                linkedAccount.getUsername(),
                linkedAccount.getProfileUrl(),
                linkedAccount.getActionType()
        );
    }


    // ✅ Get Linked Accounts by Primary ID
    @GetMapping("/{primaryId}")
    public List<LinkedAccount> getLinkedAccounts(@PathVariable Long primaryId) {
        return linkedAccountService.getLinkedAccounts(primaryId);
    }
}
