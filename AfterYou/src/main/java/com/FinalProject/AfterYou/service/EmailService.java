package com.FinalProject.AfterYou.service;

import com.FinalProject.AfterYou.model.AssignExecutor;
import com.FinalProject.AfterYou.model.DeathCertificate;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.ByteArrayResource;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.verification.code.expiry:5}")
    private int codeExpiryMinutes;

    /**
     * Sends a verification email with a 5-digit code (HTML version)
     */
// In EmailService:
    public void sendVerificationCode(String toEmail, String verificationCode) throws MessagingException {
        String subject = "Password Reset Verification Code"; // Fixed subject

        String html = "<div style='font-family:sans-serif;padding:20px'>" +
                "<h2>Password Reset Request</h2>" +
                "<p>Your verification code is:</p>" +
                "<div style='font-size:24px;font-weight:bold;margin:20px 0'>" + verificationCode + "</div>" +
                "<p>This code will expire in " + codeExpiryMinutes + " minutes.</p>" +
                "<p>If you didn't request this password reset, please ignore this email.</p></div>";

        sendHtmlEmail(toEmail, subject, html);
    }


    /**
     * Sends a verification email with HTML formatting
     */
    public void sendVerificationEmail(String toEmail, String verificationLink) throws MessagingException {
        String subject = "Verify Your Email Address";

        String html = "<div style='font-family:sans-serif;padding:20px'>" +
                "<h2>Welcome to AfterYou</h2>" +
                "<p>Please click the button below to verify your email address:</p>" +
                "<a href='" + verificationLink + "' " +
                "style='display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;margin:10px 0'>" +
                "Verify Email</a>" +
                "<p>If you didn't create an account, please ignore this email.</p></div>";

        sendHtmlEmail(toEmail, subject, html);
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




    /**
     * Helper method to send HTML emails
     */
    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

}