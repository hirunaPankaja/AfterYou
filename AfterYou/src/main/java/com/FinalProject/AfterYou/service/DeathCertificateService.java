// DeathCertificateService.java
package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.AssignLawyer;
import com.FinalProject.AfterYou.model.UserRegistrationDetails;
import com.FinalProject.AfterYou.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class DeathCertificateService {

    @Autowired
    private DeathCertificateRepository deathCertificateRepository;

    @Autowired
    private AssignExecutorRepository executorRepository;

    @Autowired
    private AssignLawyerRepository lawyerRepository;

    @Autowired
    private UserDetailsRepo userRepo;

    @Autowired
    private EmailService emailService;

    public DeathCertificate uploadCertificate(String deceasedName, Date deceasedDate, byte[] certificate, int executorId) {
        AssignExecutor executor = executorRepository.findById(executorId).orElse(null);
        if (executor == null) return null;

        int userId = executor.getUserId();

        // Get lawyer info
        AssignLawyer lawyer = lawyerRepository.findByUserId(userId);
        String lawyerEmail = lawyer != null ? lawyer.getLawyerEmail() : null;
        Integer lawyerId = lawyer != null ? lawyer.getLawyerId() : null;

        UserRegistrationDetails user = userRepo.findByUserId(userId);

        DeathCertificate cert = new DeathCertificate();
        cert.setDeceasedName(deceasedName);
        cert.setDeceasedDate(deceasedDate);
        cert.setDeathCertificate(certificate);
        cert.setUserId(userId);
        cert.setExecutorId(executorId);
        cert.setVerified(false);

        DeathCertificate saved = deathCertificateRepository.save(cert);

        if (lawyerEmail != null && user != null && lawyerId != null) {
            emailService.sendDeathCertificateVerificationEmail(
                    lawyerEmail,
                    cert,
                    executor.getExecutorName(),
                    executor.getExecutorEmail(),
                    user.getFirstName() + " " + user.getLastName(),
                    lawyerId
            );
        }

        return saved;
    }


    public boolean verifyCertificate(int certId) {
        Optional<DeathCertificate> cert = deathCertificateRepository.findById(certId);

        if (cert.isPresent()) {
            DeathCertificate deathCertificate = cert.get();
            deathCertificate.setVerified(true); // Update the status
            deathCertificateRepository.save(deathCertificate);
            return true;
        }
        return false;
    }

    public DeathCertificate getByExecutorId(int executorId) {
        return deathCertificateRepository.findByExecutorId(executorId);
    }

    public boolean isCertificateVerified(int executorId) {
        DeathCertificate certificate = deathCertificateRepository.findIsVerifiedByExecutorId(executorId);
        return certificate != null && certificate.isVerified(); // ✅ correct for boolean
    }

}
