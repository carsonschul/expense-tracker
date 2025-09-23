import { useState } from 'react'
import './index.css'
import ExpenseArray from './ExpenseArray.jsx';
import ExpenseForm from './ExpenseForm.jsx';
import AddExpense from './AddExpense.jsx';

function App() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [expenseType, setExpenseType] = useState({ value: "", label: "Select a category:" });
  const [customExpense, setCustomExpense] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);

  const expenseOptions = [
    { value: "", label: "Select a category:" },
    { value: "food", label: "Food" },
    { value: "rent", label: "Rent" },
    { value: "utilities", label: "Utilities" },
    { value: "transportation", label: "Transportation" },
    { value: "health", label: "Health and Fitness" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "travel", label: "Travel" },
    { value: "education", label: "Education" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        id="tracker-container"
        className="flex flex-col bg-gray-400 w-full max-w-md h-3/4 mx-auto p-6 rounded-2xl shadow-xl">
        <h1
          className="text-3xl font-bold underline text-center mb-4">
          Expense Tracker
        </h1>
        <ExpenseArray
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray} />
        <ExpenseForm
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          expenseType={expenseType}
          setExpenseType={setExpenseType}
          expenseOptions={expenseOptions}
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          customExpense={customExpense}
          setCustomExpense={setCustomExpense} />
        <AddExpense
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown} />
      </div>
    </div>
  )
}
export default App
