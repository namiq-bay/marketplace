package com.marketplace.accountservice.service;

import com.marketplace.accountservice.model.Account;
import com.marketplace.accountservice.model.dto.AccountDTO;

import java.text.ParseException;
import java.util.List;

public interface AccountService {

    List<AccountDTO> getAll();

    AccountDTO get(String id);

    Account save(AccountDTO account) throws ParseException;

    void update(AccountDTO account);

    void delete(String id);
}
