package com.FinalProject.AfterYou.repo;


import com.FinalProject.AfterYou.model.UserAccount;
import com.FinalProject.AfterYou.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    // Fetch primary account by email
    Optional<UserAccount> findByEmailAndAccountType(String email, AccountType accountType);
}
