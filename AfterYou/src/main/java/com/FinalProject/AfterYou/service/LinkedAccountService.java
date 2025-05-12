package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.LinkedAccountRepository;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LinkedAccountService {

    private final LinkedAccountRepository linkedAccountRepository;
    private final PrimaryAccountRepository primaryAccountRepository;

    public LinkedAccountService(LinkedAccountRepository linkedAccountRepository, PrimaryAccountRepository primaryAccountRepository) {
        this.linkedAccountRepository = linkedAccountRepository;
        this.primaryAccountRepository = primaryAccountRepository;
    }

    // ✅ Add Linked Account (Improved Error Handling)
    public LinkedAccount addLinkedAccount(Long primaryId, String platform, String username, String profileUrl, String actionType) {
        PrimaryAccount primaryAccount = primaryAccountRepository.findById(primaryId)
                .orElseThrow(() -> new RuntimeException("Primary account not found"));

        LinkedAccount linkedAccount = new LinkedAccount(primaryAccount, platform, username, profileUrl, actionType);
        return linkedAccountRepository.save(linkedAccount);
    }

    // ✅ Get Linked Accounts by Primary ID
    public List<LinkedAccount> getLinkedAccounts(Long primaryId) {
        PrimaryAccount primaryAccount = primaryAccountRepository.findById(primaryId)
                .orElseThrow(() -> new RuntimeException("Primary account not found"));

        return linkedAccountRepository.findByPrimaryAccountAndIsDeletedFalse(primaryAccount);
    }

    // ✅ Soft Delete Linked Account (Ensures Data Integrity)
    public void softDeleteLinkedAccount(Long linkedAccountId) {
        LinkedAccount linkedAccount = linkedAccountRepository.findById(linkedAccountId)
                .orElseThrow(() -> new RuntimeException("Linked account not found"));

        if (!linkedAccount.isDeleted()) {
            linkedAccount.setDeleted(true);
            linkedAccountRepository.save(linkedAccount);
        } else {
            throw new RuntimeException("Linked account is already deleted.");
        }
    }

    // ✅ Get All Linked Accounts (For Admin Use)
    public List<LinkedAccount> getAllLinkedAccounts() {
        return linkedAccountRepository.findAll();
    }
}
