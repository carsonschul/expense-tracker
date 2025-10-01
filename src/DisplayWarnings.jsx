export default function DisplayWarnings({ expenseWarning, amountWarning, formatWarning }) {
    return (
        <>
            {
                expenseWarning === true && (
                    <p className="text-white text-center bg-red-500 text-xl font-semibold rounded py-2 px-4 mb-4">Bro, choose an expense!!!</p>
                )
            }
            {
                amountWarning === true && (
                    <p className="text-white text-center bg-red-500 text-xl font-semibold rounded py-2 px-4 mb-4">Bro, enter an amount!!!</p>
                )
            }
            {
                formatWarning === true && (
                    <p className="text-white text-center bg-red-500 text-xl font-semibold rounded py-2 px-4 mb-4">Bro, that's an invalid format!!!</p>
                )
            }
        </>
    )
}