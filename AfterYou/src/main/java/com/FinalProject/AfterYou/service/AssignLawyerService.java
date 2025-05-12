package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.repo.AssignLawyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignLawyerService {

    @Autowired
    private AssignLawyerRepository assignLawyerRepository;

    public AssignLawyer assignLawyer(AssignLawyer assignLawyer, int userId) {
        assignLawyer.setUserId(userId);
        assignLawyer.setRegistrationCompleted(false);
        return assignLawyerRepository.save(assignLawyer);
    }

    public AssignLawyer getLawyerByEmail(String email) {
        return assignLawyerRepository.findByLawyerEmail(email);
    }

    public AssignLawyer completeRegistration(String email,String nicNumber, String idNumber, byte[] idImage) {
        AssignLawyer lawyer = assignLawyerRepository.findByLawyerEmail(email);
        if (lawyer != null) {
            lawyer.setLawyerNicNumber(nicNumber);
            lawyer.setLawyerIdNumber(idNumber);
            lawyer.setLawyerIdImage(idImage);
            lawyer.setRegistrationCompleted(true);
            return assignLawyerRepository.save(lawyer);
        }
        return null;
    }
}