export default function AddExpense({ showDropdown, setShowDropdown, showBudgetForm }) {
    return (
        <>
            {(!showDropdown && !showBudgetForm) && (
                <button
                    className="bg-blue-400 rounded py-2 px-4 shadow cursor-pointer mt-2"
                    onClick={() => { setShowDropdown(true); }}>
                    Add Expense
                </button>
            )}
        </>
    )
}