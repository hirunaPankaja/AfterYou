package com.FinalProject.AfterYou.DTO;

import lombok.Data;

@Data
public class CompleteRegistrationRequest {
    private String nicNumber;
    private String idNumber;
    private byte[] idImage;
}
