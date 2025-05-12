package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.AssignLawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignLawyerRepository extends JpaRepository<AssignLawyer, Integer> {
    AssignLawyer findByLawyerEmail(String email);
}