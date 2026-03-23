package com.project.Expense_Tracker.dto;

public class LoginResponse {

    private String message;
    private Long userId;

    // constructor
    public LoginResponse(String message, Long userId) {
        this.message = message;
        this.userId = userId;
    }

    // getters
    public String getMessage() { return message; }
    public Long getUserId() { return userId; }
}
