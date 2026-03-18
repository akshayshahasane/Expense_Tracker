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

            <h2 className="text-xl font-semibold mb-4">Expenses</h2>

            <table className="w-full border">

                <thead className="bg-gray-200">
                <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Action</th>
                </tr>
                </thead>

                <tbody>

                {expenses.map(expense=>(
                    <tr key={expense.id} className="text-center border-t">

                        <td className="p-2">{expense.expenseName}</td>
                        <td className="p-2">₹ {expense.amount}</td>
                        <td className="p-2">{expense.date}</td>

                        <td className="p-2 space-x-2">

                            <button
                                className="bg-yellow-400 px-2 py-1 rounded"
                                onClick={()=>setSelectedExpense(expense)}
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
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