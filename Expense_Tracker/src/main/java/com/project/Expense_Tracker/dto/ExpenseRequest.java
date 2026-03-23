package com.project.Expense_Tracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseRequest {

    private String expenseName;
    private double amount;
    private LocalDate date;
    private String description;
    private Long userId;
}
