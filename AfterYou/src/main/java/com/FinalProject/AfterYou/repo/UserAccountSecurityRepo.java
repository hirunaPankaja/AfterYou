package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserAccountSecurity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountSecurityRepo extends JpaRepository<UserAccountSecurity, Integer> {
}
