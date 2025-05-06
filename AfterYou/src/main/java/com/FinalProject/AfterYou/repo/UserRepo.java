package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserCredentials, Integer> {
    UserCredentials findByEmail(String email);
}


// plain -> hash1 -> hash2
