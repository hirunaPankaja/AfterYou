package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserIdentityRepo extends JpaRepository<UserIdentity, Integer> {
    @Query("SELECT u.identityNumber FROM UserIdentity u WHERE u.user.userId = :userId")
    String getNicByUserId(int userId);
}
