export default function WelcomeMessage({ showWelcome, view }) {
    return (
        <>
            {(showWelcome && view === "home") && (
                <div className="m-auto text-center flex flex-col gap-4">
                    <p>Welcome to expense tracker!</p>
                    <p>Click "Add Expense" to add an expense!</p>
                    <p>If you'd like, you can also add a budget with "Add Budget."</p>
                </div>
            )}
        </>
    )
}