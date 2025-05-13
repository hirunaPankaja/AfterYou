package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "subscriptions")
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionId;

    @Column(nullable = false)
    private String platformName;

    @Column(nullable = false)
    private String subscriptionPlan;

    @Column(nullable = false)
    private String planPrice;

    @Column(nullable = false)
    private LocalDate subscriptionStartDate;

    @Column(nullable = false)
    private LocalDate subscriptionEndDate;

    @ManyToOne
    @JoinColumn(name = "primary_id", nullable = false)
    private PrimaryAccount primaryAccount;

    // ✅ Constructor Matching Service Call
    public Subscription(String platformName, PrimaryAccount primaryAccount, String subscriptionPlan, String planPrice, LocalDate subscriptionStartDate, LocalDate subscriptionEndDate) {
        this.platformName = platformName;
        this.primaryAccount = primaryAccount;
        this.subscriptionPlan = subscriptionPlan;
        this.planPrice = planPrice;
        this.subscriptionStartDate = subscriptionStartDate;
        this.subscriptionEndDate = subscriptionEndDate;
    }
}
