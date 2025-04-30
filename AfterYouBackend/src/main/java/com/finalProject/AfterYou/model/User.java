package com.finalProject.AfterYou.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
}
