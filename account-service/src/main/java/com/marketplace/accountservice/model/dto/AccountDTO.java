package com.marketplace.accountservice.model.dto;

import com.marketplace.accountservice.model.Location;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;

@Setter
@Getter
@Builder
public class AccountDTO {
    private String id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private String photoID;
    private Date birthDate;
    private String location;
}
