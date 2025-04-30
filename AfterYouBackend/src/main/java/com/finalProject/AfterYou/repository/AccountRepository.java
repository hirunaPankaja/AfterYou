package com.finalProject.AfterYou.repository;

import com.finalProject.AfterYou.model.DigitalAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<DigitalAccount, Long> {
}