package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    List<UserAccount> findByAccountType(String accountType);
    List<UserAccount> findByEmailAndAccountType(String email, String accountType);
}
