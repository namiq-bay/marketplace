package com.marketplace.accountservice.api;

import com.marketplace.accountservice.exception.UserNotFoundException;
import com.marketplace.accountservice.model.Account;
import com.marketplace.accountservice.model.dto.AccountDTO;
import com.marketplace.accountservice.service.AccountService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountAPI {

    private final AccountService accountService;

    public AccountAPI(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDTO> getAccount(@PathVariable String id) {
        return ResponseEntity.ok(accountService.get(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAll());
    }

    @PostMapping
    public ResponseEntity<URI> createAccount(@RequestBody AccountDTO accountDTO) throws ParseException {
        Account account = accountService.save(accountDTO);
        String id = account.getId();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping
    public ResponseEntity<?> updateAccount(@RequestBody AccountDTO account) {
        accountService.update(account);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable String id) {
        accountService.delete(id);
        return ResponseEntity.ok().build();
    }

//    @Value("${file.storage.dir}")
//    private String FILE_DIRECTORY;
//
//    @PostMapping("/upload")
//    public ResponseEntity<Object> uploadPhoto(@RequestParam("productID") String productID,
//                                              @RequestParam("producerID") String producerID,
//                                              @RequestParam("File") MultipartFile file) throws IOException {
//
//        File myFile = new File(FILE_DIRECTORY+file.getOriginalFilename());
//        myFile.createNewFile();
//        FileOutputStream fos = new FileOutputStream(myFile);
//        fos.write(file.getBytes());
//        fos.close();
//
//        return new ResponseEntity<Object>("The file uploaded sucsesfuly!", HttpStatus.OK);
//
//    }
}
