package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.SubscriptionDTO;
import com.FinalProject.AfterYou.model.Subscription;
import com.FinalProject.AfterYou.model.PrimaryAccount;
import com.FinalProject.AfterYou.service.SubscriptionService;
import com.FinalProject.AfterYou.service.PrimaryAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // ✅ Add Subscription Using Email Instead of PrimaryAccount Object
    @PostMapping("/add")
    public ResponseEntity<?> addSubscription(@RequestBody Subscription subscription) {
        try {
            // ✅ Validate Primary Account Using Email
            Optional<PrimaryAccount> primaryAccountOptional = primaryAccountService.getPrimaryAccount(subscription.getPrimaryAccount().getEmail());

            if (primaryAccountOptional.isEmpty()) {
                return ResponseEntity.status(404).body("Primary account not found.");
            }

            // ✅ Extract PrimaryAccount from Optional
            PrimaryAccount primaryAccount = primaryAccountOptional.get();

            // ✅ Save Subscription Using Service Method with Individual Parameters
            Subscription savedSubscription = subscriptionService.addSubscription(
                    subscription.getPlatformName(),
                    primaryAccount.getEmail(), // ✅ Pass email instead of PrimaryAccount object
                    subscription.getSubscriptionPlan(),
                    subscription.getPlanPrice(),
                    subscription.getSubscriptionStartDate(),
                    subscription.getSubscriptionEndDate()
            );

            // ✅ Convert to DTO to exclude PrimaryAccount details
            SubscriptionDTO subscriptionDTO = new SubscriptionDTO(
                    savedSubscription.getSubscriptionId(),
                    savedSubscription.getPlatformName(),
                    savedSubscription.getSubscriptionPlan(),
                    savedSubscription.getPlanPrice(),
                    savedSubscription.getSubscriptionStartDate(),
                    savedSubscription.getSubscriptionEndDate()
            );

            return ResponseEntity.ok(subscriptionDTO);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving subscription: " + e.getMessage());
        }
    }

    // ✅ Get All Subscriptions Without PrimaryAccount Details
    @GetMapping("/all")
    public ResponseEntity<List<SubscriptionDTO>> getAllSubscriptions() {
        List<SubscriptionDTO> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @GetMapping("/by-primary/{primaryId}")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptionsByPrimaryAccount(@PathVariable Long primaryId) {
        List<SubscriptionDTO> subscriptions = subscriptionService.getSubscriptionsByPrimaryAccount(primaryId);
        return ResponseEntity.ok(subscriptions);
    }
}

