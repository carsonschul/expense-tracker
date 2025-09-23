export default function AddExpense({ showDropdown, setShowDropdown }) {
    return (
        <>
            {!showDropdown && (
                <button
                    className="bg-blue-400 rounded py-2 px-4 shadow cursor-pointer mt-auto"
                    onClick={() => { setShowDropdown(true); }}>
                    Add Expense
                </button>
            )}
        </>
    )
}