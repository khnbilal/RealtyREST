package com.realestate.realtyrest.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Initialize password encoder
    }

    public boolean registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return false; // User already exists
        }
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword); // Set the hashed password
        userRepository.save(user); // Save the user with the hashed password
        return true; // Registration successful
    }

    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsername(username); // Find user by username
        if (user != null) {
            // Compare the entered password with the stored hashed password
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false; // User not found or password doesn't match
    }
}
