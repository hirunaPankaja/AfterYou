package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.AssignExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignExecutorRepository extends JpaRepository<AssignExecutor, Integer> {
    Optional<AssignExecutor> findByExecutorEmail(String email);
    List<AssignExecutor> findByUserId(int userId);
    boolean existsByExecutorEmail(String email);
    boolean existsByExecutorNicNumber(String nicNumber);
}