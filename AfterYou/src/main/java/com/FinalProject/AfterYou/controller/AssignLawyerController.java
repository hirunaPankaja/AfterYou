package com.FinalProject.AfterYou.controller;

import com.FinalProject.AfterYou.DTO.AssignLawyerRequest;
import com.FinalProject.AfterYou.DTO.CompleteRegistrationRequest;
import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.service.AssignLawyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/lawyers")
public class AssignLawyerController {

    @Autowired
    private AssignLawyerService service;

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

    @GetMapping("/{email}")
    public ResponseEntity<AssignLawyer> getLawyerByEmail(@PathVariable String email)  {
        AssignLawyer lawyer = service.getLawyerByEmail(email);
        if (lawyer != null) {
            return ResponseEntity.ok(lawyer);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping(value = "/complete-registration/{email}", consumes =MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AssignLawyer> completeRegistration(
            @PathVariable String email,
            @RequestParam String nicNumber,
            @RequestParam String idNumber,
            @RequestParam ("idImage") MultipartFile idImage) throws IOException{

        AssignLawyer updatedLawyer = service.completeRegistration(
                email,
                nicNumber,
                idNumber,
                idImage.getBytes());

        if (updatedLawyer != null) {
            return ResponseEntity.ok(updatedLawyer);
        }
        return ResponseEntity.notFound().build();
    }

}