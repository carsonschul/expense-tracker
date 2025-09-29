import { useState, useEffect } from "react";
import "./index.css";
import ExpenseList from "./ExpenseList.jsx";
import Forms from "./Forms.jsx";
import Header from "./Header.jsx";
import WelcomeMessage from "./WelcomeMessage.jsx";
import BudgetValue from "./BudgetValue.jsx";
import Buttons from "./Buttons.jsx";
import TotalValue from "./TotalValue.jsx";

function App() {
  const [expenseType, setExpenseType] = useState({ value: "", label: "Select a category:" });
  const [customExpense, setCustomExpense] = useState("");

  const [expenseArray, setExpenseArray] = useState(() => {
    const saved = localStorage.getItem("expenseArray");
    return saved ? JSON.parse(saved) : [];
  });

  const [showWelcome, setShowWelcome] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenseArray");
    const parsedExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];
    return !savedBudget && parsedExpenses.length === 0;
  });

  const [budgetInput, setBudgetInput] = useState("");
  const [budget, setBudget] = useState(() => {
    return localStorage.getItem("budget") || "";
  });

  const [view, setView] = useState("home");
  const [expenseWarning, setExpenseWarning] = useState(false);
  const [amountWarning, setAmountWarning] = useState(false);
  const [formatWarning, setFormatWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
  }, [expenseArray]);

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
  ];

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        id="tracker-container"
        className="flex flex-col bg-gray-400 w-full max-w-md h-3/4 mx-auto p-6 rounded-2xl shadow-xl"
      >
        <Header />
        <WelcomeMessage showWelcome={showWelcome} view={view} />
        <ExpenseList
          expenseArray={expenseArray}
          setExpenseArray={setExpenseArray}
          budget={budget}
          setBudget={setBudget}
          showWelcome={showWelcome}
          view={view}
          expenseWarning={expenseWarning}
          setExpenseWarning={setExpenseWarning}
          amountWarning={amountWarning}
          setAmountWarning={setAmountWarning}
          formatWarning={formatWarning}
          setFormatWarning={setFormatWarning}
        />
        <Forms
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
          setBudget={setBudget}
          expenseWarning={expenseWarning}
          setExpenseWarning={setExpenseWarning}
          amountWarning={amountWarning}
          setAmountWarning={setAmountWarning}
          formatWarning={formatWarning}
          setFormatWarning={setFormatWarning}
        />
        <div className="flex flex-col mt-auto">
          <div className="flex items-center justify-between">
            <BudgetValue
              budget={budget}
              setBudget={setBudget}
              view={view}
              showWelcome={showWelcome}
              expenseArray={expenseArray}
            />
            <TotalValue
              expenseArray={expenseArray}
              view={view}
              showWelcome={showWelcome}
            />
          </div>
          <Buttons
            view={view}
            setView={setView}
            showWelcome={showWelcome}
            setShowWelcome={setShowWelcome}
            budget={budget}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
