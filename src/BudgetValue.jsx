export default function BudgetValue({ budget, setBudget }) {
    return (
        <>
            {budget && (
                <div className="flex flex-row gap-4 items-center">
                    <p>Budget: {budget}</p>
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