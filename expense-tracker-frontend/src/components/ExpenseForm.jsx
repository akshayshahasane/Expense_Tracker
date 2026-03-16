import { useState } from "react";
import API from "../services/api";

function ExpenseForm({ selectedExpense, refreshExpenses }) {

    const [expense, setExpense] = useState({
        expenseName: "",
        amount: "",
        date: "",
        description: ""
    });

    const handleChange = (e)=>{
        setExpense({...expense,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{

            if(selectedExpense){
                await API.put(`/expenses/${selectedExpense.id}`, expense);
                alert("Expense Updated");
            }else{
                await API.post("/expenses", expense);
                alert("Expense Added");
            }

            refreshExpenses();

        }catch(error){
            console.error(error);
        }
    };

    return(

        <div>

            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="expenseName"
                    placeholder="Expense Name"
                    onChange={handleChange}
                />

                <input
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                />

                <button type="submit">Save</button>

            </form>

        </div>
    );
}

export default ExpenseForm;