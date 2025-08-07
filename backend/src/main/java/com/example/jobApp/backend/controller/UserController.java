package com.example.jobApp.backend.controller;

import com.example.jobApp.backend.model.User;
import com.example.jobApp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/user")
    public ResponseEntity<?> getLoginUser(@RequestBody Map<String, String> creds){
        String username = creds.get("username");
        String password = creds.get("password");

        User user = userRepository.findByUsername(username);
        if (user==null){
            return ResponseEntity.status(401).body("User not found.");
        }

        if(passwordEncoder.matches(password, user.getPassword())){
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Successfully logged in");
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(401).body("Invalid password.");
        }

    }

    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User user){
        if(userRepository.existsByUsername(user.getUsername())){
            return ResponseEntity
                    .badRequest().body("Username already taken");
        }

        if(!user.getPassword().equals(user.getConfirmPassword())){
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        user.setConfirmPassword(null);
        userRepository.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully.");
        response.put("userId", user.getId());
        return ResponseEntity.ok(response);
    }
}
