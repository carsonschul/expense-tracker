export default function DisplayWarnings({ expenseWarning, amountWarning, formatWarning }) {
    return (
        <>
            {
                expenseWarning === true && (
                    <p className="text-red-600 font-semibold">Bro, choose an expense!!!</p>
                )
            }
            {
                amountWarning === true && (
                    <p className="text-red-600 font-semibold">Bro, enter an amount!!!</p>
                )
            }
            {
                formatWarning === true && (
                    <p className="text-red-600 font-semibold">Bro, that's an invalid format!!!</p>
                )
            }
        </>
    )
}