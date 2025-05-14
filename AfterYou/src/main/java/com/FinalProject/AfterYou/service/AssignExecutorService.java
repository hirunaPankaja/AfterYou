package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.ExecutorLoginResponseDto;
import com.FinalProject.AfterYou.DTO.UserProfileDto;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.UserCredentials;
import com.FinalProject.AfterYou.model.UserIdentity;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AssignExecutorService {
    @Autowired
    private AssignExecutorRepository repository;

    @Autowired
    private UserDetailsRepo userDetailsRepo;

    @Autowired
    private UserIdentityRepo userIdentityRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AssignLawyerRepository assignLawyerRepository;

    @Autowired
    private EmailService emailService;

    public AssignExecutor assignExecutor(AssignExecutor executor, int userId) {
        executor.setUserId(userId);
        executor.setRegistrationCompleted(false);
        AssignExecutor savedExecutor = repository.save(executor);

        // Fetch lawyer email
        String lawyerEmail = assignLawyerRepository.findLawyerEmailByUserId(userId);

        // Send email
        emailService.sendExecutorInfoToLawyer(lawyerEmail, savedExecutor, userId);

        return savedExecutor;
    }


    public AssignExecutor getExecutorByEmailAndUserId(String email, int userId) {
        return repository.findByExecutorEmailAndUserId(email, userId)
                .orElse(null);
    }

    public AssignExecutor completeExecutorRegistration(int executorId, byte[] nicImage, String password) {
        return repository.findById(executorId)
                .map(executor -> {
                    executor.setExecutorNicImage(nicImage);
                    executor.setExecutorPassword(password);
                    executor.setRegistrationCompleted(true);
                    return repository.save(executor);
                })
                .orElse(null);
    }

    public AssignExecutor getExecutorById(int executorId) {
        return repository.findById(executorId).orElse(null);
    }

    // In AssignExecutorService
    public AssignExecutor saveExecutor(AssignExecutor executor) {
        return repository.save(executor);
    }


    public UserProfileDto getUserProfileByEmail(String email) {
        // Retrieve user ID based on the email from the userRepo or repository
        Integer userId = repository.findUserIdByEmail(email);

        // If no user found with that email, throw an exception
        if (userId == null) {
            throw new RuntimeException("User not found for email: " + email);
        }

        // Retrieve user registration details using the userId
        Optional<UserRegistrationDetails> registrationDetailsOpt = userDetailsRepo.findById(userId);

        // If the user details are not found, throw an exception
        if (registrationDetailsOpt.isPresent()) {
            // Get registration details from Optional
            UserRegistrationDetails registrationDetails = registrationDetailsOpt.get();

            // Retrieve associated details: NIC and Email using the userId
            String nic = userIdentityRepo.getNicByUserId(userId);
            String retrievedEmail = userRepo.getEmailByUserId(userId);

            // Construct and return the UserProfileDto
            return new UserProfileDto(
                    registrationDetails.getFirstName(),
                    registrationDetails.getLastName(),
                    retrievedEmail,  // Use the email from userRepo
                    registrationDetails.getGender(),
                    registrationDetails.getDOB(),
                    registrationDetails.getAddress(),
                    registrationDetails.getPhoneNumber(),
                    nic,  // NIC from userIdentityRepo
                    registrationDetails.getProfilePic()  // Profile picture from registration details
            );
        } else {
            // If user registration details are not found, throw an exception
            throw new RuntimeException("User not found for email: " + email);
        }
    }

    public ExecutorLoginResponseDto executorLogin(String email, String password) {
        AssignExecutor executor = repository.findByExecutorEmail(email)
                .orElseThrow(() -> new RuntimeException("Executor not found with email: " + email));

        if (!executor.getExecutorPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return new ExecutorLoginResponseDto(executor.getExecutorEmail(), executor.getExecutorId());
    }

}