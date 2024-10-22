package com.realestate.realtyrest.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        boolean success = userService.registerUser(user);
        if (success) {
            response.put("success", true);
            response.put("message", "Registration successful.");
        } else {
            response.put("success", false);
            response.put("message", "Username already exists.");
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        boolean success = userService.loginUser(user.getUsername(), user.getPassword());
        if (success) {
            response.put("success", true);
            response.put("message", "Login successful.");
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password.");
        }
        return response;
    }
}
