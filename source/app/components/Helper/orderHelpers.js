

export const totalPrice = (arr) => {
    if (arr && arr.length > 0) {
        const sum = arr.reduce((accumulator, object) => {
            return accumulator + (object.price * object.quantity);
        }, 0);
        return sum;
    }
}

export const totalPrice2 = (arr) => {
    if (arr && arr.length > 0) {
        const sum = arr.reduce((accumulator, object) => {
            return accumulator + (object.products_price * object.quantity);
        }, 0);
        return sum;
    }
}

export const finaltotalPrice = (v1, v2, v3) => {
    const sum = v1 + (v2 + v3);
    return sum;
}

export const finaltotalPriceType = (v1, v2) => {
    const sum = v1 + (v2);
    return sum;
}

export const subTotalPrice = (v1, v2) => {
    const sum = v1 + (v2);
    return sum;
}

export const handleDiscount = (v1, v2) => {
    const sum = v1 - (v2);
    return sum;
}

export const finaltotalPricePercentage = (v1, v2, v3) => {
    let total = v1;
    let percentage = v2;
    // let newTotal = (percentage / 100) * total;
    let newTotal = (total / 100) * percentage;
    const sum = v1 + (newTotal + v3);
    return sum;
}

export const dotReplace = (item) => {
    const data = item.toString().replace('.', '')
    var s = item + '';
    s = s.replace('.', '');
    s = parseInt(s);
    return data;
}

export const findPercentage = (v1, v2) => {
    let total = v1;
    let percentage = v2;
    let newTotal = (total / 100) * percentage;
    return parseInt(newTotal).toFixed(0);
}