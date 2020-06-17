package com.svtt.library.library.service.Impl;

import com.svtt.library.library.domain.Book;
import com.svtt.library.library.repository.BookRepository;
import com.svtt.library.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.svtt.library.library.utils.FileUtils;

import javax.servlet.ServletContext;
import java.awt.print.Pageable;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    BookRepository bookRepository;

    @Override
    public Book createBook(Book book, MultipartFile mulFile) throws IOException {
        File file = FileUtils.convert(mulFile);
        String extension = FileUtils.getExtensionImageFromUrl(file.getName());
        String path = "images/"+ file.getName();
        FileUtils.createFile(path,FileUtils.fileToByte(file));
        book.setImgUrl(path);
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book updateBook(Book book, MultipartFile mulfile) throws IOException {
        File file = FileUtils.convert(mulfile);
        String extension = FileUtils.getExtensionImageFromUrl(file.getName());
        String path = "images/"+ file.getName();
        FileUtils.createFile(path,FileUtils.fileToByte(file));
        book.setImgUrl(path);
        return bookRepository.save(book);
    }
    
    @Override
    public List<Book> findAll(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<Book> books = bookRepository.findAll(pageRequest);
        return books.stream().collect(Collectors.toList());
    }
}
