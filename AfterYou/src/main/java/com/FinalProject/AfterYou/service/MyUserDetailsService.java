package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.model.UserPrincipal;
import com.FinalProject.AfterYou.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

@Autowired
private UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserCredentials user = repo.findByEmail(email);
        if (user == null){
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        return new UserPrincipal(user);
    }
}
