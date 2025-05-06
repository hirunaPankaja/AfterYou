package com.FinalProject.AfterYou.model;

import jakarta.persistence.Entity;
import org.springframework.data.annotation.Id;

@Entity
public class UserCredentials {
    @Id
    private int id;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    private String email;
    private String Password;
}
