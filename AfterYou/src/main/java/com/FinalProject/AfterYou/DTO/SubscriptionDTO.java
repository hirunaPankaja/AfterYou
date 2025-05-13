package com.FinalProject.AfterYou.DTO;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {
    private Long subscriptionId;
    private String platformName;
    private String subscriptionPlan;
    private String planPrice;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;
}

