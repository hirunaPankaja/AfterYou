package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepo extends JpaRepository<UserRegistrationDetails, Integer> {
}
