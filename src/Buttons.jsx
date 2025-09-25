export default function Buttons({ view, setView, showWelcome, setShowWelcome, }) {
    return (
        <>
            {(view === "home") && (
                <button
                    className="bg-blue-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                    onClick={() => { setView("expense-form"); }}>
                    Add Expense
                </button>
            )}
            {
                (view === "home") && (
                    <button
                        className="bg-green-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                        onClick={() => { setView("budget-form"); setShowWelcome(false); }}>
                        Add Budget
                    </button>
                )
            }
            {
                (view === "home" && !showWelcome) && (
                    <button
                        className="bg-yellow-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                        onClick={() => setShowWelcome(true)}>
                        Show Welcome Message
                    </button>
                )
            }
            {
                (showWelcome && view === "home") && (
                    <button
                        className="bg-yellow-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                        onClick={() => setShowWelcome(false)}>
                        Hide Welcome Message
                    </button>
                )
            }
        </>
    )
}