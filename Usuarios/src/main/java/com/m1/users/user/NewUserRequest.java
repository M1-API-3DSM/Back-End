package com.m1.users.user;

import com.m1.users.enums.Role;
import lombok.Data;

@Data
public class NewUserRequest {
    private String username;
    private String password;
    private Role role;

    public NewUserRequest(String username, String password, Role role){
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
