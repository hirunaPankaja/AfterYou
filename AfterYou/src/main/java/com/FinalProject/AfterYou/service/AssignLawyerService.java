package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.DTO.LawyerDetailsDTO;
import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.repo.AssignLawyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AssignLawyerService {

    @Autowired
    private AssignLawyerRepository assignLawyerRepository;

    public AssignLawyer assignLawyer(AssignLawyer assignLawyer, int userId) {
        assignLawyer.setUserId(userId);
        assignLawyer.setRegistrationCompleted(false);
        return assignLawyerRepository.save(assignLawyer);
    }

    public AssignLawyer getLawyerByEmailAndUserId(String email, int userId) {
        return assignLawyerRepository.findByLawyerEmailAndUserId(email, userId);
    }

    public AssignLawyer completeRegistration(String email,String nicNumber, String idNumber, byte[] idImage, int userID) {
        AssignLawyer lawyer = assignLawyerRepository.findByLawyerEmailAndUserId(email, userID);
        if (lawyer != null) {
            lawyer.setLawyerNicNumber(nicNumber);
            lawyer.setLawyerIdNumber(idNumber);
            lawyer.setLawyerIdImage(idImage);
            lawyer.setRegistrationCompleted(true);
            return assignLawyerRepository.save(lawyer);
        }
        return null;
    }
    public LawyerDetailsDTO getLawyerDetailsById(Integer lawyerId) {
        Optional<AssignLawyer> optionalLawyer = assignLawyerRepository.findById(lawyerId);

        if (optionalLawyer.isEmpty()) {
            throw new RuntimeException("Lawyer not found");
        }

        AssignLawyer lawyer = optionalLawyer.get();

        LawyerDetailsDTO dto = new LawyerDetailsDTO();
        dto.setLawyerName(lawyer.getLawyerName());
        dto.setLawyerEmail(lawyer.getLawyerEmail());
        dto.setLawyerIdNumber(lawyer.getLawyerIdNumber());

        return dto;
    }

}