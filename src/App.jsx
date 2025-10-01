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
        className="
    flex flex-col
    bg-gray-400
    w-full h-full     
    sm:max-w-lg sm:h-[90%] 
    mx-auto
    p-4 sm:p-6            
    rounded-none sm:rounded-2xl
    shadow-none sm:shadow-2xl
  "
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
        {(view === "home" && !showWelcome) && (
          <div className={expenseArray.length > 0 || budget ? ("border-t-2 border-white flex items-center p-1 rounded-b gap-2 bg-gray-500") : ("flex items-center p-1 rounded-b gap-2 bg-gray-500")} >
            {budget && (
              <BudgetValue
                budget={budget}
                setBudget={setBudget}
                view={view}
                showWelcome={showWelcome}
                expenseArray={expenseArray}
              />
            )}
            {expenseArray.length > 0 && (
              <TotalValue
                expenseArray={expenseArray}
                view={view}
                showWelcome={showWelcome}
              />
            )}
          </div>
        )}
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
        <Buttons
          view={view}
          setView={setView}
          showWelcome={showWelcome}
          setShowWelcome={setShowWelcome}
          budget={budget}
          setBudget={setBudget}
        />
      </div>
    </div>
  );
}

export default App;
