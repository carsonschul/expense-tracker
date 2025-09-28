export default function formatMoney(amount) {
    if (!amount) return null;
    const value = parseFloat(amount);
    if (isNaN(value) || value < 0) return null;
    const parts = amount.split(".");
    if (parts.length > 1 && parts[1].length > 2) {
        return null;
    }
    return `$${value.toFixed(2)}`;
}