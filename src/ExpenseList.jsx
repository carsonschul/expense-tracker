import { useState } from 'react'
import DisplayWarnings from './DisplayWarnings.jsx'
import formatMoney from './FormatMoney.js'

export default function ExpenseList({ expenseArray, setExpenseArray, showWelcome, view, expenseWarning, setExpenseWarning, amountWarning, setAmountWarning, formatWarning, setFormatWarning }) {

    const [editingIndex, setEditingIndex] = useState(null);
    const [editValues, setEditValues] = useState({
        value: "",
        label: "",
        amount: ""
    })

    return (
        <>
            {(!showWelcome && view === "home") && (
                <div className="flex flex-col flex-grow overflow-y-auto bg-gray-500 p-4 mb-4 rounded">
                    {expenseArray.length > 0 && (
                        <ul className="flex flex-col">
                            {expenseArray.map((expense, i) => (
                                <li
                                    key={i}
                                    className={`flex flex-wrap gap-4 w-full mb-2 ${editingIndex === i ? "items-end" : "items-center"
                                        }`}
                                >
                                    {editingIndex !== i ? (
                                        <>
                                            <span>{expense.label}</span>
                                            <span>{expense.amount}</span>
                                        </>
                                    ) :
                                        <div className="flex gap-4 min-w-0">
                                            <div className="flex flex-col min-w-0">
                                                <label htmlFor="expense-input">Expense:</label>
                                                <input
                                                    id="expense-input"
                                                    type="text"
                                                    className="bg-white rounded py-1 px-2 mt-2"
                                                    placeholder="Banana"
                                                    value={editValues.label}
                                                    onChange={e => {
                                                        const value = e.target.value
                                                        setEditValues(prev => ({
                                                            ...prev,
                                                            value: value.toLowerCase(),
                                                            label: value
                                                        }));
                                                        if (value.trim() !== "") {
                                                            setExpenseWarning(false);
                                                        }
                                                    }} />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <label htmlFor="amount-input">Amount:</label>
                                                <input
                                                    id="amount-input"
                                                    type="number"
                                                    className="bg-white rounded py-1 px-2 mt-2"
                                                    placeholder="0.00"
                                                    value={editValues.amount}
                                                    onChange={e => {
                                                        const value = e.target.value
                                                        setEditValues(prev => ({
                                                            ...prev,
                                                            amount: value
                                                        }));
                                                        if (value.trim() !== "") {
                                                            setAmountWarning(false);
                                                        }
                                                        if (!isNaN(parseFloat(value)) || value.trim() == "") {
                                                            setFormatWarning(false);
                                                        }
                                                    }} />
                                            </div>
                                        </div>
                                    }
                                    <div className="flex gap-4">
                                        {editingIndex !== i ? (
                                            <button
                                                className="bg-green-400 rounded cursor-pointer py-2 px-4"
                                                onClick={() => {
                                                    setEditingIndex(i);
                                                    setEditValues({
                                                        value: expense.value,
                                                        label: expense.label,
                                                        amount: expense.amount.slice(1)
                                                    })
                                                }}>
                                                Edit
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-400 rounded cursor-pointer py-2 px-4"
                                                onClick={() => {

                                                    let isError = false

                                                    if (!editValues.label.trim()) {
                                                        setExpenseWarning(true);
                                                        isError = true;
                                                    }
                                                    if (!editValues.amount.trim()) {
                                                        return setAmountWarning(true);
                                                    }
                                                    const formattedAmount = formatMoney(editValues.amount)
                                                    if (!formattedAmount) {
                                                        return setFormatWarning(true);
                                                    }
                                                    if (isError) return;
                                                    setExpenseArray(prev =>
                                                        prev.map((expense, index) =>
                                                            index === i ?
                                                                ({ ...editValues, amount: formattedAmount })
                                                                : (
                                                                    expense
                                                                )
                                                        )
                                                    )
                                                    setEditingIndex(null);
                                                    setExpenseWarning(false);
                                                    setAmountWarning(false);
                                                    setFormatWarning(false);
                                                }}>
                                                Confirm
                                            </button>
                                        )
                                        }
                                        {editingIndex !== i ? (
                                            <button
                                                className="bg-red-400 rounded cursor-pointer py-2 px-4"
                                                onClick={() => {
                                                    setExpenseArray(prev => prev.filter((_, index) => index !== i))
                                                }}>
                                                Delete
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-red-400 rounded cursor-pointer py-2 px-4"
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                    setExpenseWarning(false);
                                                    setAmountWarning(false);
                                                    setFormatWarning(false);
                                                }}>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )
            }
            {view === "home" && (
                <div className="pt-2">
                    <DisplayWarnings
                        expenseWarning={expenseWarning}
                        amountWarning={amountWarning}
                        formatWarning={formatWarning} />

                </div>
            )}
        </>
    );
}