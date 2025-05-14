package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.AssignLawyerRequest;
import com.FinalProject.AfterYou.DTO.CompleteRegistrationRequest;
import com.FinalProject.AfterYou.DTO.LawyerDetailsDTO;
import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.repo.AssignExecutorRepository;
import com.FinalProject.AfterYou.repo.AssignLawyerRepository;
import com.FinalProject.AfterYou.repo.UserDetailsRepo;
import com.FinalProject.AfterYou.service.AssignLawyerService;
import com.FinalProject.AfterYou.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/lawyers")
public class AssignLawyerController {

    @Autowired
    private AssignLawyerService service;

    @Autowired
    private AssignLawyerRepository assignLawyerRepository;

    @Autowired
    private AssignExecutorRepository assignExecutorRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserDetailsRepo userRepo;

    @PostMapping("/assign")
    public ResponseEntity<AssignLawyer> assignLawyer(
            @RequestBody AssignLawyerRequest request,
            @RequestParam int userId) {

        AssignLawyer lawyer = new AssignLawyer();
        lawyer.setLawyerName(request.getLawyerName());
        lawyer.setLawyerEmail(request.getLawyerEmail());
        lawyer.setLawyerContact(request.getLawyerContact());

        AssignLawyer saveLawyer = service.assignLawyer(lawyer, userId);
        return ResponseEntity.ok(saveLawyer);
    }

    @GetMapping("/by-email-and-user")
    public ResponseEntity<AssignLawyer> getLawyerByEmailAndUserId(
            @RequestParam String email,
            @RequestParam int userId) {

        AssignLawyer lawyer = service.getLawyerByEmailAndUserId(email, userId);
        return lawyer != null ?
                ResponseEntity.ok(lawyer) :
                ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/complete-registration/{email}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AssignLawyer> completeRegistration(
            @PathVariable String email,
            @RequestParam String nicNumber,
            @RequestParam String idNumber,
            @RequestParam("idImage") MultipartFile idImage,
            @RequestParam int userId) throws IOException {

        AssignLawyer lawyer = assignLawyerRepository.findByLawyerEmailAndUserId(email, userId);
        if (lawyer != null) {
            lawyer.setLawyerNicNumber(nicNumber);
            lawyer.setLawyerIdNumber(idNumber);
            lawyer.setLawyerIdImage(idImage.getBytes());
            lawyer.setRegistrationCompleted(true);
            AssignLawyer updatedLawyer = assignLawyerRepository.save(lawyer);

            // Fetch executor and user
            AssignExecutor executor = assignExecutorRepository.findByUserId(userId);
            UserRegistrationDetails user = userRepo.findByUserId(userId);

            // Send email to executor
            if (executor != null && user != null) {
                emailService.sendExecutorRegistrationEmail(
                        executor.getExecutorEmail(),
                        executor.getExecutorName(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getPhoneNumber(),
                        userId
                );
            }

            return ResponseEntity.ok(updatedLawyer);
        }

        return ResponseEntity.notFound().build();
    }
    @GetMapping("/details/{lawyerId}")
    public ResponseEntity<LawyerDetailsDTO> getLawyerDetails(@PathVariable Integer lawyerId) {
        LawyerDetailsDTO dto = service.getLawyerDetailsById(lawyerId);
        return ResponseEntity.ok(dto);
    }


}