export function formatMoney(value) {
    if (value == null || value === '') return '';
    const number = parseInt(value.toString().replace(/[^\d]/g, ''), 10);
    return number.toLocaleString('en-US');
}

export function formatMoneyToInt(value) {
    if (value == null || value === '') return '';
    const number = parseInt(value.toString().replace(/[^\d]/g, ''), 10);
    return number;
}
