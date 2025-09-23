export default function ExpenseArray({ expenseArray, setExpenseArray }) {
    return (
        <>
            {expenseArray.length > 0 && (
                <ul>
                    {expenseArray.map((expense, i) => (
                        <li
                            key={i}>
                            {expense.label}
                            {expense.amount}
                            <button
                                className="bg-red-400 rounded cursor-pointer py-2 px-4"
                                onClick={() => {
                                    setExpenseArray(prev => prev.filter((_, index) => index !== i))
                                }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}