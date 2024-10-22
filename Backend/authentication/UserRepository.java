package com.realestate.realtyrest.authentication;


import com.realestate.realtyrest.authentication.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
