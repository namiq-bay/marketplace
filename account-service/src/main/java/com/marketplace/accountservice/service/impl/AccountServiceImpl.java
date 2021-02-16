package com.marketplace.accountservice.service.impl;

import com.marketplace.accountservice.exception.UserNotFoundException;
import com.marketplace.accountservice.model.Account;
import com.marketplace.accountservice.model.AccountType;
import com.marketplace.accountservice.model.Location;
import com.marketplace.accountservice.model.dto.AccountDTO;
import com.marketplace.accountservice.repo.AccountRepository;
import com.marketplace.accountservice.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

//    public AccountServiceImpl(AccountRepository accountRepository) {
//        this.accountRepository = accountRepository;
//    }

    @Override
    public List<AccountDTO> getAll() {
        return accountRepository.findAll()
                .stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AccountDTO get(String id) {
        Account account = accountRepository.getById(id);

        if (account == null)
            throw new UserNotFoundException(id);

        return mapToDTO(account);
    }

    @Override
    public Account save(AccountDTO account) throws ParseException {

        return accountRepository.save(
                Account.builder()
                        .id(UUID.randomUUID().toString())
                        .username(account.getUsername())
                        .name(account.getName())
                        .surname(account.getSurname())
                        .email(account.getEmail())
                        .birthDate(account.getBirthDate())
                        .location(Location.valueOf(account.getLocation()))
                        .photoID("test23243") // photoID will come from Storage service
                        .type(AccountType.CONSUMER)
                        .build()
        );
    }

    @Override
    public void update(AccountDTO account) {

        accountRepository.save(Account.builder()
                .id(account.getId())
                .username(account.getUsername())
                .name(account.getName())
                .surname(account.getSurname())
                .email(account.getEmail())
                .birthDate(account.getBirthDate())
                .location(Location.valueOf(account.getLocation()))
                .build()
        );
    }

    @Override
    public void delete(String id) {
        Account account = accountRepository.findById(id).get();
        if (account == null)
            throw new UserNotFoundException(id);

        accountRepository.delete(account);
    }

    public AccountDTO mapToDTO(Account account) {

        return AccountDTO.builder()
                .id(account.getId())
                .username(account.getUsername())
                .name(account.getName())
                .surname(account.getSurname())
                .email(account.getEmail())
                .photoID(account.getPhotoID())
                .birthDate(account.getBirthDate())
                .location(String.valueOf(account.getLocation()))
                .build();
    }
}
