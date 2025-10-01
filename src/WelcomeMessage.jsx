export default function WelcomeMessage({ showWelcome, view }) {
    return (
        <>
            {(showWelcome && view === "home") && (
                <div className="mt-4 h-full text-center items-center justify-evenly flex flex-col gap-4 bg-gray-500 text-white rounded p-4">
                    <p className="text-xl">Welcome to Expense Tracker!</p>
                    <p className="text-xl">Click "Add Expense" to add an expense!</p>
                    <p className="text-xl">If you'd like, you can also add a budget with "Add Budget."</p>
                </div>
            )}
        </>
    )
}