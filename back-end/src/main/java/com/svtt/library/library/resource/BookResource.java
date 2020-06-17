package com.svtt.library.library.resource;

import com.svtt.library.library.domain.Book;
import com.svtt.library.library.repository.BookRepository;
import com.svtt.library.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/book")
public class BookResource {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public ResponseEntity<Book> postBook(Book book, MultipartFile file) throws IOException {
        Book bookresult = bookService.createBook(book, file);
        return ResponseEntity.ok(bookresult);
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam(value = "size", defaultValue = "5") Integer size) {
        List<Book> books = bookService.findAll(page, size);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAll() {
        List<Book> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping
    public void delete(@RequestParam("id") Long id) {
        bookService.deleteBook(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping
    public ResponseEntity<Book> updateBook(Book book, MultipartFile file) throws IOException {
        System.out.println(book);
        return ResponseEntity.ok(bookService.updateBook(book, file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getById(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(bookRepository.findById(id).get());
    }
}