export default function expenseTotal(expenseArray) {
    return expenseArray.reduce((sum, expense) =>
        sum + Number(expense.amount.slice(1)), 0
    );
}