package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserCredentials, Integer> {
    UserCredentials findByEmail(String email);
    @Query("SELECT u.email FROM UserCredentials u WHERE u.user.userId = :userId")
    String getEmailByUserId(int userId);
}


// plain -> hash1 -> hash2
