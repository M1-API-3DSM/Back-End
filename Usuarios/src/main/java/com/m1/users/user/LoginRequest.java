package com.m1.users.user;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}