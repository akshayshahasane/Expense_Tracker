import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Dashboard(){

    const [view,setView] = useState("add"); // add | list
    const [selectedExpense,setSelectedExpense] = useState(null);

    const refreshExpenses = ()=>{
        window.location.reload();
    };

    return(

        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">

            <h1 className="text-3xl font-bold text-center mb-6">
                💰 Welcome to Expense Tracker
            </h1>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-6">

                <button
                    onClick={()=>setView("add")}
                    className={`px-6 py-2 rounded-full shadow transition 
    ${view==="add"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"}`}
                >
                    ➕ Add Expense
                </button>

                <button
                    onClick={()=>setView("list")}
                    className={`px-6 py-2 rounded-full shadow transition 
    ${view==="list"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"}`}
                >
                    📋 Expense List
                </button>

            </div>

            {/* Conditional UI */}

            {view === "add" && (
                <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
                    <ExpenseForm
                        selectedExpense={selectedExpense}
                        refreshExpenses={refreshExpenses}
                    />
                </div>
            )}

            {view === "list" && (
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <ExpenseList
                        setSelectedExpense={(exp)=>{
                            setSelectedExpense(exp);
                            setView("add"); // switch to form for editing
                        }}
                    />
                </div>
            )}

        </div>
    );
}

export default Dashboard;