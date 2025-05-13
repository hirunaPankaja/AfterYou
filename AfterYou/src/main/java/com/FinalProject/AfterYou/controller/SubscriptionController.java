package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.model.Subscription;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.service.SubscriptionService;
import com.FinalProject.AfterYou.service.PrimaryAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/subscription") // ✅ Base path for subscription API
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final PrimaryAccountService primaryAccountService;

    public SubscriptionController(SubscriptionService subscriptionService, PrimaryAccountService primaryAccountService) {
        this.subscriptionService = subscriptionService;
        this.primaryAccountService = primaryAccountService;
    }

    // ✅ Add Subscription
    @PostMapping("/add")
    public ResponseEntity<?> addSubscription(@RequestBody Subscription subscription) {
        try {
            // ✅ Validate Primary Account
            Optional<PrimaryAccount> primaryAccountOptional = Optional.ofNullable(primaryAccountService.getPrimaryAccountById(subscription.getPrimaryAccount().getPrimaryId()));

            if (primaryAccountOptional.isEmpty()) {
                return ResponseEntity.status(404).body("Primary account not found.");
            }

            // ✅ Extract PrimaryAccount from Optional
            PrimaryAccount primaryAccount = primaryAccountOptional.get();

            // ✅ Save Subscription Using Service Method with Individual Parameters
            Subscription savedSubscription = subscriptionService.addSubscription(
                    subscription.getPlatformName(),
                    primaryAccount, // ✅ Pass extracted PrimaryAccount
                    subscription.getSubscriptionPlan(),
                    subscription.getPlanPrice()
            );

            return ResponseEntity.ok(savedSubscription);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving subscription: " + e.getMessage());
        }
    }

    // ✅ Get Subscriptions by Primary Account ID
    @GetMapping("/primary/{primaryId}")
    public ResponseEntity<?> getSubscriptionsByPrimaryId(@PathVariable Long primaryId) {
        List<Subscription> subscriptions = subscriptionService.getSubscriptionsByPrimaryId(primaryId);
        if (subscriptions.isEmpty()) {
            return ResponseEntity.status(404).body("No subscriptions found for this primary account.");
        }
        return ResponseEntity.ok(subscriptions);
    }

    // ✅ Get All Subscriptions
    @GetMapping("/all")
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }
}
