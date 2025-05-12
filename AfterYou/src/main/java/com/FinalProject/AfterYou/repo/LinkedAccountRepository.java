package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.LinkedAccount;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LinkedAccountRepository extends JpaRepository<LinkedAccount, Long> {
    List<LinkedAccount> findByPrimaryAccountAndIsDeletedFalse(PrimaryAccount primaryAccount); // ✅ Remove Pageable
}
