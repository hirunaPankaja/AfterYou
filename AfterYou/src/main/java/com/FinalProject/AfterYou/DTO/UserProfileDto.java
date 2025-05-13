package com.FinalProject.AfterYou.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;
import java.util.Date;

@Setter
@Getter
public class UserProfileDto {
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String NIC;
    private String address;
    private Date DOB;
    private String phoneNumber;
    private byte[] profilePic;
    private String profilePicBase64;

    public UserProfileDto(String firstName, String lastName, String email, String gender, Date DOB,
                          String address, String phoneNumber, String NIC, byte[] profilePic) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.NIC = NIC;
        this.DOB = DOB;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.profilePic = profilePic;

        // ✅ Convert byte[] to base64 string for frontend display
        if (profilePic != null) {
            this.profilePicBase64 = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(profilePic);
        } else {
            this.profilePicBase64 = null;
        }
    }

    // No need for manual getter — Lombok handles this
}
