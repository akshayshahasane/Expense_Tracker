import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({ selectedExpense, refreshExpenses }) {

    const [expense, setExpense] = useState({
        expenseName: "",
        amount: "",
        date: "",
        description: ""
    });

    useEffect(()=>{
        if(selectedExpense){
            setExpense(selectedExpense);
        }
    },[selectedExpense]);

    const handleChange = (e)=>{
        setExpense({...expense,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(selectedExpense){
            await API.put(`/expenses/${selectedExpense.id}`, expense);
            alert("Expense Updated");
        }else{
            await API.post("/expenses", expense);
            alert("Expense Added");
        }

        refreshExpenses();
    };

    return(

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

                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Save
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;