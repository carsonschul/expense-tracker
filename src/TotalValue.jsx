import expenseTotal from './ExpenseTotal.js'
export default function TotalValue({ expenseArray, view, showWelcome }) {

    const total = expenseTotal(expenseArray);

    return (
        <>
            {

                (expenseArray.length > 0 && view === "home" && !showWelcome) && (
                    <p className="pl-2">Total Expenses: ${total.toFixed(2)}</p>
                )

            }
        </>
    )
}