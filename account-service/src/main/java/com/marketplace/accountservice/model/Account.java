package com.marketplace.accountservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.Date;

@Data
@Entity
@Table(name = "accounts")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Account {

    @Id
    private String id;

    @Column(unique = true)
    private String username;

    private String name;

    private String surname;

    @Column(unique = true)
    private String email;

    private String photoID;

    private Date birthDate;

    private Location location;

    private AccountType type;
}

