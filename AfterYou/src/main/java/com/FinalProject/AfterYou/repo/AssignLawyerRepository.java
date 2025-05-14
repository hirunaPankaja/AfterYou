package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.AssignLawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignLawyerRepository extends JpaRepository<AssignLawyer, Integer> {
    AssignLawyer findByLawyerEmailAndUserId(String email, int userId);
    // AssignLawyerRepository.java
    @Query("SELECT a.lawyerEmail FROM AssignLawyer a WHERE a.userId = :userId")
    String findLawyerEmailByUserId(@Param("userId") int userId);

    // Replace the existing query with this:
    AssignLawyer findByUserId(int userId);

}