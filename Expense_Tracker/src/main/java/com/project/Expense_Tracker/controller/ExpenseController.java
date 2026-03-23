package com.project.Expense_Tracker.controller;

import com.project.Expense_Tracker.dto.ExpenseRequest;
import com.project.Expense_Tracker.entity.Expense;
import com.project.Expense_Tracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5174")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Add Expense
    @PostMapping
    public Expense addExpense(@RequestBody ExpenseRequest request){


        try {
            return expenseService.addExpense(request);
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    // Get All Expenses
    @GetMapping
    public List<Expense> getExpensesByUser(@RequestParam Long userId){
        return expenseService.getExpensesByUserId(userId);
    }

    // Get Expense By id
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }

    // Update Expense
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense){
        return expenseService.updateExpense(id, expense);
    }

    // Delete Expense
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id){
        return expenseService.deleteExpense(id);
    }
}