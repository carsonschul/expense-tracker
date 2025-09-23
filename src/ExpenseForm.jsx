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
    setCustomExpense }) {

    const [expenseWarning, setExpenseWarning] = useState(false);
    const [amountWarning, setAmountWarning] = useState(false);
    const [expenseAmount, setExpenseAmount] = useState("");

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
                            setExpenseAmount(e.target.value)
                            if (expenseAmount.trim() !== "") {
                                setAmountWarning(false);
                            }
                        }} />
                    {expenseWarning === true && (
                        <p className="text-red-600 font-semibold">Bro, choose an expense!!!</p>
                    )}
                    {amountWarning === true && (
                        <p className="text-red-600 font-semibold">Bro, enter an amount!!!</p>
                    )}
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-400 rounded py-2 px-4 cursor-pointer"
                            onClick={() => {
                                if (expenseType.value === "other") {
                                    customExpense.trim() === "" && expenseAmount.trim() === "" ? (
                                        setExpenseWarning(true), setAmountWarning(true)
                                    ) : customExpense.trim() === "" ? (
                                        setExpenseWarning(true)
                                    ) : (
                                        setExpenseArray([
                                            ...expenseArray,
                                            { value: customExpense, label: customExpense, amount: expenseAmount }
                                        ]),
                                        setShowDropdown(false),
                                        setExpenseType({ value: "", label: "Select a category" }),
                                        setCustomExpense(""),
                                        setExpenseAmount(""))
                                } else if (expenseType.value === "" && expenseAmount.trim() === "") {
                                    setExpenseWarning(true);
                                    setAmountWarning(true);
                                } else if (expenseType.value === "") {
                                    setExpenseWarning(true);
                                } else if (expenseAmount.trim() === "") {
                                    setAmountWarning(true);
                                } else {
                                    setExpenseArray([
                                        ...expenseArray,
                                        { value: expenseType.value, label: expenseType.label, amount: expenseAmount }
                                    ])
                                    setShowDropdown(false);
                                    setExpenseType({ value: "", label: "Select a category" });
                                    setCustomExpense("");
                                    setExpenseAmount("");
                                }
                            }}>
                            Confirm
                        </button>
                        <button
                            className="bg-red-400 rounded py-2 px-4 cursor-pointer"
                            onClick={() => {
                                setShowDropdown(false);
                                setExpenseType({ value: "", label: "Select a category:" });
                                setCustomExpense("")
                                setExpenseAmount("")
                                setExpenseWarning(false);
                                setAmountWarning(false);
                            }}>
                            Cancel
                        </button>
                    </div>
                </div >
            )
            }
        </>
    )
}