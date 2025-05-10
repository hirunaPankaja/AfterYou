package com.FinalProject.AfterYou.DTO;

import com.FinalProject.AfterYou.model.UserAccountSecurity;
import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.model.UserIdentity;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class UserRegistrationRequest {
    private UserRegistrationDetails userBasicInfo;
    private UserCredentials credentials;
    private UserAccountSecurity accountSecurity;
    private UserIdentity identity;
}
