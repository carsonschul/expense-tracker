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
                <div className="w-full h-full bg-gray-500 mt-4 rounded-t overflow-y-auto">
                    {expenseArray.length > 0 && (
                        <div className="flex bg-gray-700 px-2 py-2 rounded-t">
                            <p className="flex w-1/3 justify-center underline text-lg text-white">Expense</p>
                            <p className="flex w-1/3 justify-center underline text-lg text-white">Amount</p>
                            <p className="flex w-1/3 justify-center underline text-lg text-white">Options</p>
                        </div>
                    )}
                    {expenseArray.length > 0 && (
                        <ul className="flex flex-col overflow-y-auto">
                            {expenseArray.map((expense, i) => (
                                <li
                                    key={i}
                                    className="px-2 py-2 flex odd:bg-gray-800 even:bg-gray-700"
                                >
                                    {editingIndex !== i ? (
                                        <>
                                            <div className="flex justify-center w-1/3 items-center">
                                                <span className="text-white text-lg hyphens-auto text-center">{expense.label}</span>
                                            </div>
                                            <div className="flex justify-center w-1/3 items-center ml-2">
                                                <span className="text-white text-lg break-all text-center">{expense.amount}</span>
                                            </div>
                                        </>
                                    ) :
                                        <>
                                            <div className="flex flex-col items-center w-1/3">
                                                <label className="text-white text-lg" htmlFor="expense-input">Expense:</label>
                                                <input
                                                    id="expense-input"
                                                    type="text"
                                                    className="bg-white rounded py-1 px-2 mt-2 w-full"
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
                                            <div className="flex flex-col items-center w-1/3 mx-2">
                                                <label className="text-white text-lg" htmlFor="amount-input">Amount:</label>
                                                <input
                                                    id="amount-input"
                                                    type="number"
                                                    className="bg-white rounded py-1 px-2 mt-2 w-full"
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
                                        </>
                                    }
                                    <div className="flex justify-center items-end w-1/3 gap-2 items-center ml-2 text-lg">
                                        {editingIndex !== i ? (
                                            <button
                                                className="flex justify-center bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded cursor-pointer text-black w-1/2 flex-shrink-0 py-3 px-3"
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
                                                className="flex justify-center bg-blue-400 hover:bg-blue-500 transition-colors duration-200 rounded cursor-pointer text-black w-1/2 flex-shrink-0 py-3 px-3"
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
                                                className="flex justify-center bg-red-400 hover:bg-red-500 transition-colors duration-200 rounded cursor-pointer text-black w-1/2 flex-shrink-0 py-3 px-3"
                                                onClick={() => {
                                                    setExpenseArray(prev => prev.filter((_, index) => index !== i))
                                                }}>
                                                Delete
                                            </button>
                                        ) : (
                                            <button
                                                className="flex justify-center bg-red-400 hover:bg-red-500 transition-colors duration-200 rounded cursor-pointer text-black w-1/2 flex-shrink-0 py-3 px-3"
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
                <div>
                    <DisplayWarnings
                        expenseWarning={expenseWarning}
                        amountWarning={amountWarning}
                        formatWarning={formatWarning} />

                </div>
            )}
        </>
    );
}