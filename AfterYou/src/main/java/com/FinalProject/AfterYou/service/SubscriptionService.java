package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.SubscriptionDTO;
import com.FinalProject.AfterYou.model.Subscription;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.repo.SubscriptionRepository;
import com.FinalProject.AfterYou.repo.PrimaryAccountRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final PrimaryAccountRepository primaryAccountRepository; // ✅ Added repository for fetching primary account by email

    public SubscriptionService(SubscriptionRepository subscriptionRepository, PrimaryAccountRepository primaryAccountRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.primaryAccountRepository = primaryAccountRepository;
    }

    // ✅ Add Subscription Using Email Instead of PrimaryAccount Object
    public Subscription addSubscription(String platformName, String email, String subscriptionPlan, String planPrice, LocalDate subscriptionStartDate, LocalDate subscriptionEndDate) {
        // ✅ Fetch Primary Account Using Email
        Optional<PrimaryAccount> primaryAccountOptional = primaryAccountRepository.findByEmail(email);

        if (primaryAccountOptional.isEmpty()) {
            throw new RuntimeException("Primary account not found for email: " + email);
        }

        PrimaryAccount primaryAccount = primaryAccountOptional.get();

        Subscription subscription = new Subscription(platformName, primaryAccount, subscriptionPlan, planPrice, subscriptionStartDate, subscriptionEndDate);
        return subscriptionRepository.save(subscription);
    }

    // ✅ Get All Subscriptions Without PrimaryAccount Details
    public List<SubscriptionDTO> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(subscription -> new SubscriptionDTO(
                        subscription.getSubscriptionId(),
                        subscription.getPlatformName(),
                        subscription.getSubscriptionPlan(),
                        subscription.getPlanPrice(),
                        subscription.getSubscriptionStartDate(),
                        subscription.getSubscriptionEndDate()
                ))
                .collect(Collectors.toList());
    }

    public List<SubscriptionDTO> getSubscriptionsByPrimaryAccount(Long primaryId) {
        List<Subscription> subscriptions = subscriptionRepository.findByPrimaryAccount_PrimaryId(primaryId);

        return subscriptions.stream()
                .map(subscription -> new SubscriptionDTO(
                        subscription.getSubscriptionId(),
                        subscription.getPlatformName(),
                        subscription.getSubscriptionPlan(),
                        subscription.getPlanPrice(),
                        subscription.getSubscriptionStartDate(),
                        subscription.getSubscriptionEndDate()
                ))
                .collect(Collectors.toList());
    }
}
