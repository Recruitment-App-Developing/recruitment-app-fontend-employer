export const splitMoney = (moneyString) => {
    const res = moneyString.split(' ');
    if (res.length >= 3) {
        return {
            salaryType: res[0],
            moneyNumber: res[1],
            moneyType: res[2],
        };
    } else {
        return {
            salaryType: '',
            moneyNumber: '',
            moneyType: '',
        };
    }
};
