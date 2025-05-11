package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.PrimaryAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PrimaryAccountRepository extends JpaRepository<PrimaryAccount, Long> {
    Optional<PrimaryAccount> findByEmail(String email);
}
