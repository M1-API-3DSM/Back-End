package com.m1.users.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StringRedisTemplate stringRedisTemplate;

    @Autowired
    public UserService(UserRepository userRepository, StringRedisTemplate stringRedisTemplate) {
        this.userRepository = userRepository;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public User getUser(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User createUser(NewUserRequest newUserRequest) {
        String user_string = String.format(
                "%s%s%s",
                newUserRequest.getUsername(),
                newUserRequest.getPassword(),
                newUserRequest.getRole()
        );

        String hash = createHash(user_string);

        User new_user = new User();
        new_user.setUsername(newUserRequest.getUsername());
        new_user.setPassword(newUserRequest.getPassword());
        new_user.setRole(newUserRequest.getRole());
        new_user.setHash(hash);
        return userRepository.save(new_user);
    }

    public void setCache(String key, String value, long expirationInSeconds) {
        stringRedisTemplate.opsForValue().set(key, value);
        stringRedisTemplate.expire(key, expirationInSeconds, TimeUnit.SECONDS);
    }

    public Boolean userIsCached(String hash) {
        return stringRedisTemplate.hasKey(hash);
    }

    public void refreshExpiration(String hash) {
        stringRedisTemplate.expire(hash, 600, TimeUnit.SECONDS);
    }

    private static String createHash(String user_string) {
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        md.update(user_string.getBytes());
        byte[] digest = md.digest();
        StringBuilder hexString = new StringBuilder();
        for (byte b : digest) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }
}
