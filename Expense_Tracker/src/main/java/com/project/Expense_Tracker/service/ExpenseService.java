package com.project.Expense_Tracker.service;

import com.project.Expense_Tracker.entity.Expense;
import com.project.Expense_Tracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Add Expense
    public Expense addExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    // Get All Expenses
    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    // Get Expense By id
    public Expense getExpenseById(Long id){
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.orElse(null);
    }

    // Update Expense
    public Expense updateExpense(Long id, Expense expenseDetails){

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setExpenseName(expenseDetails.getExpenseName());
        expense.setAmount(expenseDetails.getAmount());
        expense.setDate(expenseDetails.getDate());
        expense.setDescription(expenseDetails.getDescription());

        return expenseRepository.save(expense);
    }

    // Delete Expense
    public String deleteExpense(Long id){

        expenseRepository.deleteById(id);

        return "Expense Deleted Successfully";
    }
}