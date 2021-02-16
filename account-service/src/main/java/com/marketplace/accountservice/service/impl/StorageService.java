package com.marketplace.accountservice.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageService {

//    @Value("${upload.path}")
    private String path = "/var/www/";

    public void uploadFile(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException();
        }

        try {
            String fileName = file.getOriginalFilename();
            final InputStream is = file.getInputStream();

            Files.copy(is, Paths.get(path + fileName),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {

            String msg = String.format("Failed to store file %f", file.getName());

            throw new RuntimeException(msg, e);
        }
    }
}