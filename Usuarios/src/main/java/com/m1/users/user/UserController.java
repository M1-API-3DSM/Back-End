package com.m1.users.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.sql.SQLIntegrityConstraintViolationException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        try {
            User user = this.userService.getUser(loginRequest);
            if (user != null) {
                this.userService.setCache(user.getHash(), "active", 600);
                LoginResponse response = new LoginResponse(user.getHash(), user.getRole());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.toString());
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> check(@RequestParam String key) {
        if (userService.userIsCached(key)) {
            this.userService.refreshExpiration(key);
            return ResponseEntity.status(HttpStatus.OK).body("Autorizado");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado");
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody NewUserRequest new_user) {
        try {
            User created_user = userService.createUser(new_user);
            if (created_user != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(created_user);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Não foi possível criar o usuário");
            }
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário ja cadastrado");
        }
    }

}
