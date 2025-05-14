package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.service.LinkedAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/linked-account")
public class LinkedAccountController {

    private final LinkedAccountService linkedAccountService;

    public LinkedAccountController(LinkedAccountService linkedAccountService) {
        this.linkedAccountService = linkedAccountService;
    }

    // ✅ Add Linked Account (Using @RequestBody)
    @PostMapping("/add")
    public ResponseEntity<?> addLinkedAccount(@RequestBody LinkedAccount linkedAccount) {
        if (linkedAccount.getPrimaryAccount() == null || linkedAccount.getPrimaryAccount().getPrimaryId() == null) {
            return ResponseEntity.badRequest().body("Primary account is required.");
        }

        try {
            LinkedAccount savedAccount = linkedAccountService.addLinkedAccount(
                    linkedAccount.getPrimaryAccount().getPrimaryId(),
                    linkedAccount.getPlatform(),
                    linkedAccount.getUsername(),
                    linkedAccount.getProfileUrl(),
                    linkedAccount.getActionType()
            );
            return ResponseEntity.ok(savedAccount);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding linked account: " + e.getMessage());
        }
    }

    // ✅ Get Linked Accounts by Primary ID (Without Pagination)
    @GetMapping("/{primaryId}")
    public ResponseEntity<?> getLinkedAccounts(@PathVariable Long primaryId) {
        try {
            List<LinkedAccount> accounts = linkedAccountService.getLinkedAccounts(primaryId);
            return accounts.isEmpty() ? ResponseEntity.status(404).body("No linked accounts found.")
                    : ResponseEntity.ok(accounts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching linked accounts: " + e.getMessage());
        }
    }

    // ✅ Soft Delete Linked Account
    @PutMapping("/delete/{linkedAccountId}")
    public ResponseEntity<?> softDeleteLinkedAccount(@PathVariable Long linkedAccountId) {
        try {
            linkedAccountService.softDeleteLinkedAccount(linkedAccountId);
            return ResponseEntity.ok("Linked account marked as deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting linked account: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<LinkedAccount>> getAllLinkedAccounts() {
        List<LinkedAccount> accounts = linkedAccountService.getAllLinkedAccounts();
        return accounts.isEmpty() ? ResponseEntity.status(404).body(null)
                : ResponseEntity.ok(accounts);
    }

    @DeleteMapping("/{linkedAccountId}")
    public ResponseEntity<String> deleteLinkedAccount(@PathVariable Long linkedAccountId) {
        try {
            linkedAccountService.deleteLinkedAccount(linkedAccountId);
            return ResponseEntity.ok("Linked account deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
