package com.svtt.library.library.service;

import com.svtt.library.library.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface BookService {
    public Book createBook(Book book, MultipartFile mulFile) throws IOException;
    public void deleteBook(Long id);
    public Book updateBook(Book book, MultipartFile mulfile) throws IOException;
    public List<Book> findAll(Integer page, Integer size);
}
