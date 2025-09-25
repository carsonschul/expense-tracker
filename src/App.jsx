import { useState } from 'react'
import './index.css'
import ExpenseArray from './ExpenseArray.jsx';
import ExpenseForm from './ExpenseForm.jsx';
import AddExpense from './AddExpense.jsx';

function App() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [expenseType, setExpenseType] = useState({ value: "", label: "Select a category:" });
  const [customExpense, setCustomExpense] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [budgetInput, setBudgetInput] = useState("");
  const [budget, setBudget] = useState("");

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
        {(showWelcome && !showDropdown) && (
          <div className="m-auto text-center flex flex-col gap-4">
            <p>Welcome to expense tracker!</p>
            <p>Click "Add Expense" to add an expense!</p>
            <p>If you'd like, you can also add a budget with "Add Budget."</p>
          </div>
        )}
        <ExpenseArray
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          budget={budget}
          setBudget={setBudget}
          showWelcome={showWelcome}
          showDropdown={showDropdown}
          showBudgetForm={showBudgetForm} />
        <ExpenseForm
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          expenseType={expenseType}
          setExpenseType={setExpenseType}
          expenseOptions={expenseOptions}
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          customExpense={customExpense}
          setCustomExpense={setCustomExpense}
          setShowWelcome={setShowWelcome}
          showBudgetForm={showBudgetForm}
          setShowBudgetForm={setShowBudgetForm}
          budgetInput={budgetInput}
          setBudgetInput={setBudgetInput}
          setBudget={setBudget} />

        <div className="flex flex-col mt-auto">
          {budget > 0 && (
            <div className="flex flex-row gap-4 items-center">
              <p>Budget: {budget}</p>
              <button
                className="bg-red-400 rounded cursor-pointer py-2 px-4"
                onClick={() => setBudget("")}>
                Delete
              </button>
            </div>
          )
          }
          <AddExpense
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            showBudgetForm={showBudgetForm} />
          {
            (!showDropdown && !showBudgetForm) && (
              <button
                className="bg-green-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                onClick={() => { setShowBudgetForm(true); setShowWelcome(false); }}>
                Add Budget
              </button>
            )
          }
          {
            (!showDropdown && !showWelcome && !showBudgetForm) && (
              <button
                className="bg-yellow-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                onClick={() => setShowWelcome(true)}>
                Show Welcome Message
              </button>
            )
          }
          {
            (showWelcome && !showDropdown && !showBudgetForm) && (
              <button
                className="bg-yellow-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                onClick={() => setShowWelcome(false)}>
                Hide Welcome Message
              </button>
            )
          }
        </div>
      </div >
    </div >
  )
}
export default App
