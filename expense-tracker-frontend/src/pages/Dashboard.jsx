import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Dashboard(){

    const [selectedExpense,setSelectedExpense] = useState(null);

    const refreshExpenses = ()=>{
        window.location.reload();
    };

    return(

        <div>

            <h1>Expense Tracker</h1>

            <ExpenseForm
                selectedExpense={selectedExpense}
                refreshExpenses={refreshExpenses}
            />

            <ExpenseList
                setSelectedExpense={setSelectedExpense}
            />

        </div>
    );
}

export default Dashboard;