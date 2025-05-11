package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.UserAccount;
import com.FinalProject.AfterYou.repo.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public UserAccount addPrimaryAccount(String email) {
        UserAccount account = new UserAccount();
        account.setEmail(email);
        account.setAccountType("PRIMARY");
        return userAccountRepository.save(account);
    }

    public UserAccount addLinkedAccount(String email, String platform, String username, String profileUrl, String actionType) {
        UserAccount linkedAccount = new UserAccount();
        linkedAccount.setEmail(email);
        linkedAccount.setAccountType("LINKED");
        linkedAccount.setPlatform(platform);
        linkedAccount.setUsername(username);
        linkedAccount.setProfileUrl(profileUrl);
        linkedAccount.setActionType(actionType);
        return userAccountRepository.save(linkedAccount);
    }

    public List<UserAccount> getPrimaryAccounts() {
        return userAccountRepository.findByAccountType("PRIMARY");
    }

    public List<UserAccount> getLinkedAccountsByEmail(String email) {
        return userAccountRepository.findByEmailAndAccountType(email, "LINKED");
    }
}
