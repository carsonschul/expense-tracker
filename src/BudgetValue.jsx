import expenseTotal from './ExpenseTotal.js'
export default function BudgetValue({ budget, setBudget, view, showWelcome, expenseArray }) {

    const total = expenseTotal(expenseArray);
    const budgetNum = Number(budget.slice(1));

    return (
        <>
            {(budget && view === "home" && !showWelcome) && (
                <div className="flex flex-row gap-4 items-center">
                    {total > budgetNum ? (
                        <p className="text-red-700">Budget: {budget}</p>
                    ) : (
                        <p>Budget: {budget}</p>
                    )
                    }
                    <button
                        className="bg-red-400 rounded cursor-pointer py-2 px-4"
                        onClick={() => setBudget("")}>
                        Delete
                    </button>
                </div>
            )
            }
        </>
    )
}