import { useState } from 'react'
import './index.css'
import ExpenseArray from './ExpenseArray.jsx';
import ExpenseForm from './ExpenseForm.jsx';
import Header from './Header.jsx';
import WelcomeMessage from './WelcomeMessage.jsx';
import BudgetValue from './BudgetValue.jsx';
import Buttons from './Buttons.jsx';

function App() {

  const [expenseType, setExpenseType] = useState({ value: "", label: "Select a category:" });
  const [customExpense, setCustomExpense] = useState("");
  const [expenseArray, setExpenseArray] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [budgetInput, setBudgetInput] = useState("");
  const [budget, setBudget] = useState("");
  const [view, setView] = useState("home");

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
        <Header />
        <WelcomeMessage
          showWelcome={showWelcome}
          view={view} />
        <ExpenseArray
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          budget={budget}
          setBudget={setBudget}
          showWelcome={showWelcome}
          view={view} />
        <ExpenseForm
          view={view}
          setView={setView}
          expenseType={expenseType}
          setExpenseType={setExpenseType}
          expenseOptions={expenseOptions}
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          customExpense={customExpense}
          setCustomExpense={setCustomExpense}
          setShowWelcome={setShowWelcome}
          budgetInput={budgetInput}
          setBudgetInput={setBudgetInput}
          setBudget={setBudget} />
        <div className="flex flex-col mt-auto">
          <BudgetValue
            budget={budget}
            setBudget={setBudget} />
          <Buttons
            view={view}
            setView={setView}
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome} />
        </div>
      </div >
    </div >
  )
}
export default App
