package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.DeathCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeathCertificateRepository extends JpaRepository<DeathCertificate, Integer> {
    // DeathCertificateRepository.java
    DeathCertificate findByExecutorId(int executorId);
    DeathCertificate findIsVerifiedByExecutorId(int executorId);


}
