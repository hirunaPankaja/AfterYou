package com.FinalProject.AfterYou.repo;

import com.FinalProject.AfterYou.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByPrimaryAccount_PrimaryId(Long primaryId);
    List<Subscription> findAll();
    void deleteById(Long subscriptionId);

}
