package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.LinkedAccountRepository;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LinkedAccountService {

    private final LinkedAccountRepository linkedAccountRepository;
    private final PrimaryAccountRepository primaryAccountRepository;

    public LinkedAccountService(LinkedAccountRepository linkedAccountRepository, PrimaryAccountRepository primaryAccountRepository) {
        this.linkedAccountRepository = linkedAccountRepository;
        this.primaryAccountRepository = primaryAccountRepository;
    }

    // ✅ Add Linked Account
    public LinkedAccount addLinkedAccount(Long primaryId, String platform, String username, String profileUrl, String actionType) {
        Optional<PrimaryAccount> primaryAccount = primaryAccountRepository.findById(primaryId);
        if (primaryAccount.isPresent()) {
            LinkedAccount linkedAccount = new LinkedAccount(primaryAccount.get(), platform, username, profileUrl, actionType);
            return linkedAccountRepository.save(linkedAccount);
        } else {
            throw new RuntimeException("Primary account not found");
        }
    }

    // ✅ Get Linked Accounts by Primary ID
    public List<LinkedAccount> getLinkedAccounts(Long primaryId) {
        Optional<PrimaryAccount> primaryAccount = primaryAccountRepository.findById(primaryId);
        return primaryAccount.map(linkedAccountRepository::findByPrimaryAccount).orElseThrow(() -> new RuntimeException("Primary account not found"));
    }
}
