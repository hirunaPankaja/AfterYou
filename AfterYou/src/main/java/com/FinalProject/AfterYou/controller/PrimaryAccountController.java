package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.service.PrimaryAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/primary-account") // ✅ Add request mapping
public class PrimaryAccountController {

    private final PrimaryAccountService primaryAccountService;

    public PrimaryAccountController(PrimaryAccountService primaryAccountService) {
        this.primaryAccountService = primaryAccountService;
    }


    @PostMapping("/add")
    public ResponseEntity<?> addPrimaryAccount(@RequestBody PrimaryAccount primaryAccount) {
        try {
            PrimaryAccount savedAccount = primaryAccountService.addPrimaryAccount(
                    primaryAccount.getUserId(),
                    primaryAccount.getEmail(),
                    primaryAccount.getPassword(),
                    primaryAccount.getRecoveryCode()
            );
            return ResponseEntity.ok(savedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage()); // ✅ Return 409 Conflict for duplicate email
        }
    }

    // ✅ Get Primary Account by Email
    @GetMapping("/{email}")
    public Optional<PrimaryAccount> getPrimaryAccount(@PathVariable String email) {
        return primaryAccountService.getPrimaryAccount(email);
    }

    @GetMapping("/primary/{id}")
    public PrimaryAccount getPrimaryAccountById(@PathVariable Long id) {
        return primaryAccountService.getPrimaryAccountById(id);
    }

    @GetMapping("/all")
    public List<PrimaryAccount> getAllPrimaryAccounts() {
        return primaryAccountService.getAllPrimaryAccounts();
    }

}
