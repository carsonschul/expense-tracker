export default function Buttons({ view, setView, showWelcome, setShowWelcome, budget, setBudget }) {
    return (
        <>
            {(view === "home") && (
                <button
                    className="bg-blue-400 hover:bg-blue-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer text-xl mt-4"
                    onClick={() => { setView("expense-form"); }}>
                    Add Expense
                </button>
            )}
            {
                (view === "home" && !budget) && (
                    <button
                        className="bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer mt-2 text-xl"
                        onClick={() => { setView("budget-form"); }}>
                        Add Budget
                    </button>
                )
            }
            {
                (view === "home" && budget) && (
                    <div className="flex w-full gap-2">
                        <button
                            className="flex-1 bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer mt-2 text-xl"
                            onClick={() => { setView("budget-form"); }}>
                            New Budget
                        </button>
                        <button
                            className="flex-1 bg-red-400 hover:bg-red-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer mt-2 text-xl"
                            onClick={() => { setBudget(""); }}>
                            Delete Budget
                        </button>
                    </div>
                )
            }
            {
                (view === "home" && !showWelcome) && (
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer mt-2 text-xl"
                        onClick={() => setShowWelcome(true)}>
                        Show Welcome Message
                    </button>
                )
            }
            {
                (showWelcome && view === "home") && (
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 rounded py-3 shadow cursor-pointer mt-2 text-xl"
                        onClick={() => setShowWelcome(false)}>
                        Hide Welcome Message
                    </button>
                )
            }
        </>
    )
}