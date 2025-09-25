import { useState } from 'react';
export default function ExpenseForm({
    showDropdown,
    setShowDropdown,
    expenseType,
    setExpenseType,
    expenseArray,
    setExpenseArray,
    expenseOptions,
    customExpense,
    setCustomExpense,
    setShowWelcome,
    showBudgetForm,
    setShowBudgetForm,
    budgetInput,
    setBudgetInput,
    setBudget
}) {

    const [expenseWarning, setExpenseWarning] = useState(false);
    const [amountWarning, setAmountWarning] = useState(false);
    const [formatWarning, setFormatWarning] = useState(false);
    const [expenseAmount, setExpenseAmount] = useState("");

    const moneyRegex = /^\$?\d+(\.\d{0,2})?$/;

    const resetForm = () => {
        setShowDropdown(false);
        setExpenseType({ value: "", label: "Select a category" });
        setCustomExpense("");
        setExpenseAmount("");
    }

    const formValidator = () => {

        const formattedAmount = formatMoney(expenseAmount);

        if (expenseType.value === "other") {
            if (customExpense.trim() === "" && expenseAmount.trim() === "") {
                setExpenseWarning(true); setAmountWarning(true);
            } else if (customExpense.trim() === "" && !formattedAmount) {
                setExpenseWarning(true); setFormatWarning(true);
            } else if (customExpense.trim() === "") {
                setExpenseWarning(true);
            } else {
                setExpenseArray([
                    ...expenseArray,
                    { value: customExpense, label: customExpense, amount: formattedAmount }
                ]);
                resetForm();
            }
        } else if (expenseType.value === "" && expenseAmount.trim() === "") {
            setExpenseWarning(true);
            setAmountWarning(true);
        } else if (expenseType.value === "" && !formattedAmount) {
            setExpenseWarning(true);
            setFormatWarning(true);
        } else if (expenseType.value === "") {
            setExpenseWarning(true);
        } else if (expenseAmount.trim() === "") {
            setAmountWarning(true);
        } else if (!formattedAmount) {
            setFormatWarning(true);
        } else {
            setExpenseArray([
                ...expenseArray,
                { value: expenseType.value, label: expenseType.label, amount: formattedAmount }
            ])
            resetForm();
        }
    }

    const formatMoney = (amount) => {
        if (amount.trim() === "") return null;
        const clean = amount.replace(/^\$/, "");
        if (!/^\d+(\.\d{1,2})?$/.test(clean)) {
            return null;
        }
        return `$${Number(clean).toFixed(2)}`;
    }

    return (
        <>
            {showDropdown && (
                <div className="my-auto flex flex-col items-center justify-center gap-4">
                    <label
                        htmlFor="expense-type"
                        className="text-center">
                        Expense Type:
                    </label>
                    <select
                        id="expense-type"
                        className="bg-white min-w-0 rounded py-1 px-2"
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
                            <label htmlFor="other-input">Custom Expense:</label>
                            <input
                                id="other-input"
                                type="text"
                                placeholder="Banana"
                                className="bg-white rounded min-w-0 py-1 px-2"
                                value={customExpense}
                                onChange={e => setCustomExpense(e.target.value)} />
                        </>
                    )}
                    <label htmlFor="expense-amount">Expense Amount:</label>
                    <input
                        id="expense-amount"
                        className="bg-white rounded min-w-0 py-1 px-2"
                        placeholder="$0.00"
                        value={expenseAmount}
                        onChange={(e) => {
                            const value = e.target.value
                            setExpenseAmount(value)
                            if (value.trim() !== "") {
                                setAmountWarning(false);
                            }
                            if (moneyRegex.test(value)) {
                                setFormatWarning(false);
                            }
                        }} />
                    {expenseWarning === true && (
                        <p className="text-red-600 font-semibold">Bro, choose an expense!!!</p>
                    )}
                    {amountWarning === true && (
                        <p className="text-red-600 font-semibold">Bro, enter an amount!!!</p>
                    )}
                    {formatWarning === true && (
                        <p className="text-red-600 font-semibold">Bro, that's an invalid format!!!</p>
                    )}
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-400 rounded py-2 px-4 cursor-pointer"
                            onClick={() => {
                                formValidator();
                                setShowWelcome(false);
                            }}>
                            Confirm
                        </button>
                        <button
                            className="bg-red-400 rounded py-2 px-4 cursor-pointer"
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
            {showBudgetForm && (
                <div className="flex flex-col gap-4 items-center justify-center m-auto">
                    <div className="flex gap-4 items-center">
                        <label htmlFor="budget-input">Enter your budget:</label>
                        <input
                            id="budget-input"
                            className="bg-white rounded min-w-0 py-1 px-2"
                            placeholder="$0.00"
                            value={budgetInput}
                            onChange={e => setBudgetInput(e.target.value)} />
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            className="bg-blue-400 rounded py-2 px-4 shadow cursor-pointer"
                            onClick={() => { setBudget(budgetInput); setShowWelcome(false); setShowBudgetForm(false); setBudgetInput(""); }}>
                            Confirm
                        </button>
                        <button
                            className="bg-red-400 rounded py-2 px-4 shadow cursor-pointer"
                            onClick={() => { setShowBudgetForm(false); setBudgetInput(""); }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}