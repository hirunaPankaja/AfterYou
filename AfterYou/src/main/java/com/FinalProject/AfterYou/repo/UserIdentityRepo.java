package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserIdentityRepo extends JpaRepository<UserIdentity, Integer> {
}
