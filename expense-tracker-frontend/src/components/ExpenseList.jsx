import { useEffect, useState } from "react";
import API from "../services/api";

function ExpenseList({ setSelectedExpense }) {

    const [expenses,setExpenses] = useState([]);

    const fetchExpenses = async ()=>{

        const res = await API.get("/expenses");

        setExpenses(res.data);
    };

    useEffect(()=>{
        fetchExpenses();
    },[]);

    const deleteExpense = async (id)=>{
        await API.delete(`/expenses/${id}`);
        fetchExpenses();
    };

    return(

        <div>

            <h2>Expense List</h2>

            <table border="1">

                <thead>

                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {expenses.map(expense=>(
                    <tr key={expense.id}>

                        <td>{expense.expenseName}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.date}</td>

                        <td>

                            <button
                                onClick={()=>setSelectedExpense(expense)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={()=>deleteExpense(expense.id)}
                            >
                                Delete
                            </button>

                        </td>

                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    );
}

export default ExpenseList;