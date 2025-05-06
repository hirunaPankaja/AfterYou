package com.FinalProject.AfterYou.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id; // ✅ Correct import
import jakarta.persistence.Table;

@Entity
@Table (name = "user_login_credentials")
public class UserCredentials {
    @Id
    private int id;

    private String email;
    private String password; // ✅ use lowercase 'password' (Java naming convention)

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
