import { useState } from "react";
import API from "../services/api";

function ExpenseList({ expenses = [], setSelectedExpense, refreshExpenses }) {
    const [filterDate, setFilterDate] = useState(""); // State to store the filter date

    const deleteExpense = async (id) => {
        try {
            await API.delete(`/expenses/${id}`);
            refreshExpenses(); // refresh the list after deletion
        } catch (error) {
            console.error("Failed to delete expense:", error.response?.data || error.message);
            alert("Failed to delete expense");
        }
    };

    // Filter expenses based on the selected date
    const filteredExpenses = filterDate
        ? expenses.filter(
            (expense) =>
                new Date(expense.date).toDateString() ===
                new Date(filterDate).toDateString()
        )
        : expenses;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>

            {/* Date Filter Input */}
            <div className="mb-4">
                <label className="mr-2 font-medium">Filter by Date:</label>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border px-2 py-1 rounded"
                />
                <button
                    className="ml-2 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    onClick={() => setFilterDate("")} // Reset filter
                >
                    Reset
                </button>
            </div>

            {filteredExpenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-2 py-1">Name</th>
                        <th className="border px-2 py-1">Amount</th>
                        <th className="border px-2 py-1">Date</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredExpenses.map((expense) => (
                        <tr key={expense.id} className="text-center">
                            <td className="border px-2 py-1">{expense.expenseName}</td>
                            <td className="border px-2 py-1">₹ {expense.amount}</td>
                            <td className="border px-2 py-1">
                                {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td className="border px-2 py-1">{expense.description}</td>
                            <td className="border px-2 py-1 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => setSelectedExpense(expense)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => deleteExpense(expense.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ExpenseList;