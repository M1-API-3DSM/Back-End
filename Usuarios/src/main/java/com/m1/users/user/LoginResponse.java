package com.m1.users.user;

import com.m1.users.enums.Role;
import lombok.Data;

@Data
public class LoginResponse {
    private String key;
    private Role role;

    public LoginResponse(String key, Role role){
        this.key = key;
        this.role = role;
    }
}
