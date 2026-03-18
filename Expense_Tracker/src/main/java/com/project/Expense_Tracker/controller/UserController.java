package com.project.Expense_Tracker.controller;

import com.project.Expense_Tracker.dto.LoginRequest;
import com.project.Expense_Tracker.entity.User;
import com.project.Expense_Tracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    @Autowired
    private UserService userService;


    // Register User
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    // Login User
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest request){
        return userService.loginUser(request);
    }
}