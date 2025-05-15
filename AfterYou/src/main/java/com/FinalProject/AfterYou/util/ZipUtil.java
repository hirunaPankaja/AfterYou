package com.FinalProject.AfterYou.util;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.model.enums.EncryptionMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

public class ZipUtil {
    public static byte[] createPasswordProtectedZip(byte[] pdfBytes, String password) {
        try {
            // Write PDF to a temporary file
            File tempPdf = File.createTempFile("temp", ".pdf");
            try (FileOutputStream fos = new FileOutputStream(tempPdf)) {
                fos.write(pdfBytes);
            }

            // Create temporary ZIP file
            File tempZip = File.createTempFile("temp", ".zip");

            // Create ZIP file with password using Zip4j
            ZipFile zipFile = new ZipFile(tempZip, password.toCharArray());
            ZipParameters parameters = new ZipParameters();
            parameters.setEncryptFiles(true);
            parameters.setEncryptionMethod(EncryptionMethod.ZIP_STANDARD);

            zipFile.addFile(tempPdf, parameters);

            // Read zip file back to bytes
            return Files.readAllBytes(tempZip.toPath());
        } catch (IOException e) {
            throw new RuntimeException("Error creating password-protected ZIP", e);
        }
    }
}
