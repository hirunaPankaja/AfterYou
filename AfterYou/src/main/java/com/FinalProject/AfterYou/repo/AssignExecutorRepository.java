package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.AssignExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssignExecutorRepository extends JpaRepository<AssignExecutor, Integer> {
    Optional<AssignExecutor> findByExecutorEmailAndUserId(String email, int userId);
    boolean existsByExecutorEmail(String email);
    boolean existsByExecutorNicNumber(String nicNumber);
    @Query("SELECT u.userId FROM AssignExecutor u WHERE u.executorEmail = :email")
    Integer findUserIdByEmail(String email);
    Optional<AssignExecutor> findByExecutorEmail(String email);
    AssignExecutor findByUserId(int userId);
}