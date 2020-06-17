package com.svtt.library.library.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
public class FileUtils {
    public static File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
    public static byte[] fileToByte(File file) throws IOException {

        byte[] bytesArray = new byte[(int) file.length()];

        FileInputStream fis = new FileInputStream(file);
        fis.read(bytesArray);
        fis.close();

        return bytesArray;
    }
    public static String getExtensionImageFromUrl(String urlString) {
        if (urlString != null && urlString.length() > 0) {
            return urlString.substring(urlString.lastIndexOf(".") + 1, urlString.length()).trim();
        }
        return null;
    }
    public static boolean createFile(String path, byte[] data) {
        try {
            File file = new File(path);
            org.apache.commons.io.FileUtils.writeByteArrayToFile(file, data);
        } catch (IOException e) {
            return false;
        }

        return true;
    }



}
