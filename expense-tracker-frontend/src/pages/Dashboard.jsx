import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import API from "../services/api";

function Dashboard() {
    const [view, setView] = useState("add"); // add | list
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenses, setExpenses] = useState([]); // store expenses

    // Fetch expenses from backend
    const refreshExpenses = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const res = await API.get(`/expenses?userId=${userId}`);
            setExpenses(res.data);
            setSelectedExpense(null); // Clear selection after refresh
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch on first load
    useEffect(() => {
        refreshExpenses();
    }, []);

    const handleAddClick = () => {
        setSelectedExpense(null); // clear any previous selection
        setView("add");
    };

    const handleEditExpense = (exp) => {
        setSelectedExpense(exp); // set selected expense
        setView("add");          // switch to form view
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                💰 Welcome to Expense Tracker
            </h1>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={handleAddClick}
                    className={`px-6 py-2 rounded-full shadow transition ${
                        view === "add" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                    ➕ Add Expense
                </button>

                <button
                    onClick={() => setView("list")}
                    className={`px-6 py-2 rounded-full shadow transition ${
                        view === "list" ? "bg-purple-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                    📋 Expense List
                </button>
            </div>

            {/* Conditional UI */}
            {view === "add" && (
                <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
                    <ExpenseForm
                        selectedExpense={selectedExpense}
                        setSelectedExpense={setSelectedExpense} // ✅ pass setter to form
                        refreshExpenses={refreshExpenses}
                    />
                </div>
            )}

            {view === "list" && (
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <ExpenseList
                        expenses={expenses}
                        setSelectedExpense={handleEditExpense} // edit switches to form
                        refreshExpenses={refreshExpenses}
                    />
                </div>
            )}
        </div>
    );
}

export default Dashboard;