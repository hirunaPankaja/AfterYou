package com.FinalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.*;

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

    @ManyToOne
    @JoinColumn(name = "primary_id", nullable = false)
    private PrimaryAccount primaryAccount;

    public Subscription(String platformName, PrimaryAccount primaryAccount, String subscriptionPlan, String planPrice) {
        this.platformName = platformName;
        this.primaryAccount = primaryAccount;
        this.subscriptionPlan = subscriptionPlan;
        this.planPrice = planPrice;
    }
}
