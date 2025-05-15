package com.FinalProject.AfterYou.DTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExecutorDataDTO {
    private String email;
    private List<LinkedAccountDTO> linkedAccounts;
    private List<SubscriptionDTO> subscriptions;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LinkedAccountDTO {
        private String platform;
        private String profileUrl;
        private String username;
    }
}
