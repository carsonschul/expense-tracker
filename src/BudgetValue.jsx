import expenseTotal from './ExpenseTotal.js'
export default function BudgetValue({ budget, setBudget, view, showWelcome, expenseArray }) {

    const total = expenseTotal(expenseArray);
    const budgetNum = Number(budget.slice(1));

    return (
        <>
            {(budget && view === "home" && !showWelcome) && (
                <div className={expenseArray.length > 0 ? ("flex flex-col justify-start gap-2 items-center w-1/2 border-r-2 border-white") : ("flex flex-1 justify-center items-center")}>
                    {total > budgetNum ? (
                        <p className="bg-red-500 text-white text-lg rounded py-1 px-1 hyphens-auto text-center">Budget: <span className="break-all">{budget}</span></p>
                    ) : (
                        <p className="text-white text-lg hyphens-auto text-center">Budget: {budget}</p>
                    )
                    }
                </div>
            )
            }
        </>
    )
}