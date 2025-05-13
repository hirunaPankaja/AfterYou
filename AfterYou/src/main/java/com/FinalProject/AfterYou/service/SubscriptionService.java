package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.Subscription;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    // ✅ Ensure Method Matches Expected Parameters
    public Subscription addSubscription(String platformName, PrimaryAccount primaryAccount, String subscriptionPlan, String planPrice) {
        Subscription subscription = new Subscription(platformName, primaryAccount, subscriptionPlan, planPrice);
        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getSubscriptionsByPrimaryId(Long primaryId) {
        return subscriptionRepository.findByPrimaryAccount_PrimaryId(primaryId);
    }

    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}
