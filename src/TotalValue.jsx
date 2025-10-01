import expenseTotal from './ExpenseTotal.js'
export default function TotalValue({ expenseArray, view, showWelcome }) {

    const total = expenseTotal(expenseArray);

    return (
        <div className="flex flex-1 w-1/2 justify-center items-center">
            {

                (expenseArray.length > 0 && view === "home" && !showWelcome) && (
                    <p className="text-white text-lg hyphens-auto text-center">Total Expenses: <span className="block break-all">${total.toFixed(2)}</span></p>
                )

            }
        </div>
    )
}