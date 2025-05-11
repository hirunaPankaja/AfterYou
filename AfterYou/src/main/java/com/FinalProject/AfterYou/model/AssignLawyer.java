package com.FinalProject.AfterYou.model;

<<<<<<< Updated upstream
=======
import com.fasterxml.jackson.annotation.JsonBackReference;
>>>>>>> Stashed changes
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lawyer_details")
public class AssignLawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< Updated upstream
    private int lawyerId;
    private String lawyerName;
    private String lawyerEmail;
    private String lawyerContact;
    private String lawyerNicNumber;
    private String lawyerIdNumber;

    @Lob
    private byte[] lawyerIdImage;
    private int userId;// Foreign key to user who assigned this lawyer
    private boolean registrationCompleted = false; // To track if lawyer completed registration
=======
    private int lawyer_id;
    private String lawyer_name;
    private String lawyer_email;
    private String lawyer_contact;
    private String lawyer_nic_number;
    private String lawyer_id_number;
    private byte[] lawyer_id_image;
    private int user_id;
>>>>>>> Stashed changes
}
