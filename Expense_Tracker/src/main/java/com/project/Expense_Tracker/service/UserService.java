package com.project.Expense_Tracker.service;

import com.project.Expense_Tracker.dto.LoginRequest;
import com.project.Expense_Tracker.dto.RegisterRequest;
import com.project.Expense_Tracker.entity.User;
import com.project.Expense_Tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Register User
    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login User
    public String loginUser(LoginRequest request){

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return "Login Successful";
        }

        throw new RuntimeException("Invalid Password");
    }
}