package com.project.Expense_Tracker.service;

import com.project.Expense_Tracker.dto.ExpenseRequest;
import com.project.Expense_Tracker.entity.Expense;
import com.project.Expense_Tracker.entity.User;
import com.project.Expense_Tracker.repository.ExpenseRepository;
import com.project.Expense_Tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    // Add Expense
    public Expense addExpense(ExpenseRequest request){

        if(request.getUserId() == null){
            throw new RuntimeException("UserId is NULL from frontend");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = new Expense();

        expense.setExpenseName(request.getExpenseName());
        expense.setAmount(request.getAmount());
        expense.setDate(request.getDate());
        expense.setDescription(request.getDescription());

        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    // Get All Expenses
    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll(); // returns all expenses
    }

    public List<Expense> getExpensesByUserId(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return expenseRepository.findByUserId(userId);
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