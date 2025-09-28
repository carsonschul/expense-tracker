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
        <div>
            {(!showWelcome && view === "home") && (
                <div>
                    {expenseArray.length > 0 && (
                        <ul>
                            {expenseArray.map((expense, i) => (
                                <li
                                    key={i}
                                    className="flex gap-4 items-end w-full">
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
                                                    className="bg-white rounded py-1 px-2"
                                                    placeholder="Banana"
                                                    value={editValues.label}
                                                    onChange={e => setEditValues(prev => ({
                                                        ...prev,
                                                        value: e.target.value.toLowerCase(),
                                                        label: e.target.value
                                                    }))} />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <label htmlFor="amount-input">Amount:</label>
                                                <input
                                                    id="amount-input"
                                                    type="number"
                                                    className="bg-white rounded py-1 px-2"
                                                    placeholder="0.00"
                                                    value={editValues.amount}
                                                    onChange={e => setEditValues(prev => ({
                                                        ...prev,
                                                        amount: e.target.value
                                                    }))} />
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
                                                        setAmountWarning(true);
                                                        isError = true;
                                                    }
                                                    if (isError) return;
                                                    const formattedAmount = formatMoney(editValues.amount)
                                                    if (!formattedAmount) {
                                                        return setFormatWarning(true);
                                                    }
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
            <div className="pt-2">
                <DisplayWarnings
                    expenseWarning={expenseWarning}
                    amountWarning={amountWarning}
                    formatWarning={formatWarning} />

            </div>
        </div>
    );
}