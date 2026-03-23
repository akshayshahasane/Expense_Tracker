import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({ selectedExpense, refreshExpenses }) {
    const [expense, setExpense] = useState({
        expenseName: "",
        amount: "",
        date: "",
        description: ""
    });

    useEffect(() => {
        if (selectedExpense) {
            setExpense(selectedExpense);
        } else {
            // Optional: default today's date when adding new expense
            setExpense(prev => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
        }
    }, [selectedExpense]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User not logged in. Please login first.");
            return;
        }

        if (!expense.expenseName || !expense.amount || !expense.date) {
            alert("Please fill all required fields.");
            return;
        }

        const data = {
            ...expense,
            userId: Number(userId),           // Must match backend Long type
            amount: Number(expense.amount)    // Ensure number for backend
        };

        try {
            if (selectedExpense) {
                await API.put(`/expenses/${selectedExpense.id}`, data);
                alert("Expense Updated");
            } else {
                await API.post("/expenses", data);
                alert("Expense Added");
            }

            // Reset form
            setExpense({
                expenseName: "",
                amount: "",
                date: new Date().toISOString().slice(0, 10),
                description: ""
            });

            refreshExpenses();

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Something went wrong. Check console for details.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                {selectedExpense ? "Update Expense" : "Add Expense"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

                <input
                    className="w-full border p-2 rounded"
                    name="expenseName"
                    placeholder="Expense Name"
                    value={expense.expenseName}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    name="amount"
                    placeholder="Amount"
                    value={expense.amount}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    name="description"
                    placeholder="Description"
                    value={expense.description}
                    onChange={handleChange}
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Save
                </button>

            </form>
        </div>
    );
}

export default ExpenseForm;