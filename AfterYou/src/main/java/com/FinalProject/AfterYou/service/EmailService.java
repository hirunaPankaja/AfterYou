package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.DeathCertificate;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String verificationLink) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("keelsprojectmanagement@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject("AfterYou Email Verification");

        String html = "<div style='font-family:sans-serif;padding:20px'>" +
                "<h2>Welcome to AfterYou</h2>" +
                "<p>Please click the button below to verify your email address:</p>" +
                "<a href='" + verificationLink + "' " +
                "style='padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px'>Verify Email</a>" +
                "<p>If you didn’t sign up, you can ignore this email.</p></div>";

        helper.setText(html, true);

        System.out.println("Sending email to: " + toEmail); // Debug log
        mailSender.send(message);
        System.out.println("Email sent successfully");
    }

    public void sendExecutorInfoToLawyer(String toEmail, AssignExecutor executor, int userId) {
        String subject = "New Executor Assigned";
        String registrationUrl = "http://localhost:5173/lawyers/register/" + toEmail + "/" + userId;

        String htmlContent = """
                    <p>Dear Lawyer,</p>
                    <p>A new executor has been assigned:</p>
                    <ul>
                        <li>Name: %s</li>
                        <li>Email: %s</li>
                        <li>NIC: %s</li>
                        <li>Relationship: %s</li>
                    </ul>
                    <p>Please click the button below to complete the registration:</p>
                    <a href="%s" style="padding:10px 20px;background-color:#28a745;color:white;text-decoration:none;border-radius:5px;">
                        Register Executor
                    </a>
                """.formatted(
                executor.getExecutorName(),
                executor.getExecutorEmail(),
                executor.getExecutorNicNumber(),
                executor.getExecutorRelationship(),
                registrationUrl
        );

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true for HTML
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendExecutorRegistrationEmail(
            String toEmail,
            String executorName,
            String userFirstName,
            String userLastName,
            String phoneNumber,
            int userId
    ) {
        String subject = "You Have Been Assigned as an Executor";
        String registrationUrl = "http://localhost:5173/executors/register/" + toEmail + "/" + userId;

        String htmlContent = """
                    <p>Dear %s,</p>
                    <p>You have been assigned as an executor for the following user:</p>
                    <ul>
                        <li>First Name: %s</li>
                        <li>Last Name: %s</li>
                        <li>Phone Number: %s</li>
                    </ul>
                    <p>Please click the button below to complete your registration:</p>
                    <a href="%s" style="padding:10px 20px;background-color:#007bff;color:white;text-decoration:none;border-radius:5px;">
                        Register as Executor
                    </a>
                """.formatted(
                executorName, userFirstName, userLastName, phoneNumber, registrationUrl
        );

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true for HTML
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send executor email", e);
        }
    }

    public void sendEmailWithAttachment(String toEmail, String subject, String htmlBody, byte[] attachmentBytes, String attachmentFilename) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // 'true' enables multipart

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = HTML content
            helper.setFrom("keelsprojectmanagement@gmail.com");

            // Add attachment from byte array
            ByteArrayResource attachment = new ByteArrayResource(attachmentBytes);
            helper.addAttachment(attachmentFilename, attachment);

            mailSender.send(message);
            System.out.println("Email with attachment sent successfully to " + toEmail);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email with attachment", e);
        }
    }

    public void sendDeathCertificateVerificationEmail(String to, DeathCertificate cert, String executorName, String executorEmail, String deceasedName, int lawyerId) {
        String subject = "Death Certificate Verification Required";

        // Include certId and lawyerId in the verification link
        String verificationLink = "http://localhost:5175/lawyer-verification?certId=" + cert.getCertId() + "&lawyerId=" + lawyerId;

        // HTML email body
        String body = "<h3>Death Certificate Review Request</h3>" +
                "<p>Deceased Name: <strong>" + deceasedName + "</strong></p>" +
                "<p>Executor Name: <strong>" + executorName + "</strong></p>" +
                "<p>Executor Email: <strong>" + executorEmail + "</strong></p>" +
                "<p>Please click the button below to verify the attached death certificate:</p>" +
                "<a href='" + verificationLink + "' " +
                "style='padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;'>Verify Certificate</a>";

        // Send the email with the attached PDF
        sendEmailWithAttachment(to, subject, body, cert.getDeathCertificate(), "death_certificate.pdf");
    }



}