import { useState } from 'react';
import formatMoney from './FormatMoney.js'
import DisplayWarnings from './DisplayWarnings.jsx'
export default function ExpenseForm({
    view,
    setView,
    expenseType,
    setExpenseType,
    expenseArray,
    setExpenseArray,
    expenseOptions,
    customExpense,
    setCustomExpense,
    setShowWelcome,
    budgetInput,
    setBudgetInput,
    setBudget,
    expenseWarning,
    setExpenseWarning,
    amountWarning,
    setAmountWarning,
    formatWarning,
    setFormatWarning
}) {

    const [expenseAmount, setExpenseAmount] = useState("");

    const resetForm = () => {
        setView("home");
        setExpenseType({ value: "", label: "Select a category:" });
        setCustomExpense("");
        setExpenseAmount("");
    }

    const expenseFormValidator = () => {

        let hasError = false;

        if (expenseType.value === "other") {
            if (!customExpense.trim()) {
                setExpenseWarning(true);
                hasError = true;
            }
        } else {
            if (!expenseType.value.trim()) {
                setExpenseWarning(true);
                hasError = true;
            }
        }


        if (!expenseAmount.trim()) {
            setAmountWarning(true);
            return;
        }

        const formattedAmount = formatMoney(expenseAmount);
        if (!formattedAmount) {
            setFormatWarning(true);
            return;
        }

        if (hasError) return;

        setExpenseArray(prev => [
            ...prev,
            {
                value:
                    expenseType.value === "other" ? customExpense : expenseType.value,
                label:
                    expenseType.value === "other" ? customExpense : expenseType.label,
                amount: formattedAmount,
            },
        ]);
        resetForm();
    };

    return (
        <>
            {view === "expense-form" && (
                <div className="flex flex-col flex-grow h-full w-full items-center">
                    <div className="flex flex-col gap-4 bg-gray-500 w-full h-full my-4 rounded p-4 justify-center items-center">
                        <label
                            htmlFor="expense-type"
                            className="text-center text-xl text-white">
                            Expense Type:
                        </label>
                        <select
                            id="expense-type"
                            className="bg-white w-3/4 sm:w-1/2 rounded py-2 px-4 text-xl"
                            value={expenseType.value}
                            onChange={e => {
                                const option = expenseOptions.find(opt => opt.value === e.target.value);
                                setExpenseType(option);
                                setExpenseWarning(false);
                            }}>
                            {expenseOptions.map(option => {
                                const value = option.value;
                                const label = option.label;
                                return (
                                    <option key={value} value={value}>{label}</option>
                                )
                            })}
                        </select>
                        {expenseType.value === "other" && (
                            <>
                                <label className="text-xl text-center text-white" htmlFor="other-input">Custom Expense:</label>
                                <input
                                    id="other-input"
                                    type="text"
                                    placeholder="Banana"
                                    className="bg-white rounded w-3/4 sm:w-1/2 py-2 px-4 text-xl"
                                    value={customExpense}
                                    onChange={e => {
                                        const value = e.target.value;
                                        setCustomExpense(value);
                                        if (value.trim() !== "") {
                                            setExpenseWarning(false);
                                        }
                                    }} />
                            </>
                        )}
                        <label className="text-xl text-center text-white" htmlFor="expense-amount">Expense Amount:</label>
                        <input
                            id="expense-amount"
                            type="number"
                            step="0.01"
                            min="0"
                            className="bg-white rounded w-3/4 sm:w-1/2 py-2 px-4 text-xl"
                            placeholder="0.00"
                            value={expenseAmount}
                            onChange={(e) => {
                                const value = e.target.value
                                setExpenseAmount(value)
                                if (value.trim() !== "") {
                                    setAmountWarning(false);
                                }
                                if (!isNaN(parseFloat(value)) || value.trim() == "") {
                                    setFormatWarning(false);
                                }
                            }} />
                    </div>
                    <div>
                        <DisplayWarnings
                            expenseWarning={expenseWarning}
                            amountWarning={amountWarning}
                            formatWarning={formatWarning} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-200 rounded py-4 px-8 cursor-pointer text-xl"
                            onClick={() => {
                                expenseFormValidator();
                                setShowWelcome(false);
                            }}>
                            Confirm
                        </button>
                        <button
                            className="bg-red-400 hover:bg-red-500 transition-colors duration-200 rounded py-4 px-8 cursor-pointer text-xl"
                            onClick={() => {
                                resetForm();
                                setExpenseWarning(false);
                                setAmountWarning(false);
                                setFormatWarning(false);
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
            }
            {view === "budget-form" && (
                <div className="flex flex-col items-center h-full w-full">
                    <div className="flex flex-col gap-4 items-center h-full bg-gray-500 rounded w-full my-4 p-4 justify-center">
                        <label className="text-xl text-white" htmlFor="budget-input">Enter your budget:</label>
                        <input
                            id="budget-input"
                            type="number"
                            step="0.01"
                            min="0"
                            className="bg-white rounded w-3/4 sm:w-1/2 py-2 px-4 text-xl"
                            placeholder="0.00"
                            value={budgetInput}
                            onChange={e => {
                                const value = e.target.value
                                setBudgetInput(value)
                                if (value.trim() !== "") {
                                    setAmountWarning(false);
                                }
                                if (!isNaN(parseFloat(value))) {
                                    setFormatWarning(false);
                                }
                            }} />
                    </div>
                    <DisplayWarnings
                        expenseWarning={expenseWarning}
                        amountWarning={amountWarning}
                        formatWarning={formatWarning} />
                    <div className="flex flex-col w-full gap-2">
                        <button
                            className="bg-blue-400 hover:bg-blue-500 transition-colors duration-200 rounded py-4 px-8 shadow cursor-pointer text-xl"
                            onClick={() => {
                                if (!budgetInput.trim()) {
                                    return setAmountWarning(true);
                                } else {
                                    const formattedBudget = formatMoney(budgetInput);
                                    if (!formattedBudget) {
                                        return setFormatWarning(true);
                                    } else {
                                        setBudget(formattedBudget);
                                        setShowWelcome(false);
                                        setView("home");
                                        setBudgetInput("");
                                    }
                                }
                            }}>
                            Confirm
                        </button>
                        <button
                            className="bg-red-400 hover:bg-red-500 transition-colors duration-200 rounded py-4 px-8 shadow cursor-pointer text-xl"
                            onClick={() => {
                                setView("home");
                                setBudgetInput("");
                                setAmountWarning(false);
                                setFormatWarning(false);
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}