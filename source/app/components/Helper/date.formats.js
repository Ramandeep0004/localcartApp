import moment from "moment"
import { isEmpty } from "./general";

export const checkInOutDate = (date) => {
    if (date) {
        return moment(date).format('LT');
    }
}

export const dateFormat = (date) => {
    if (date) {
        return moment(date).format('ll');
    }
}

export const dateFormatFull = (date) => {
    if (!isEmpty(date)) {
        return moment(date).format('LL');
    }
}

export const fromTime = (date) => {
    if (date) {
        return moment(date).fromNow();
    }
}

export const filtersDateFormat = (date) => {
    if (date) {
        return moment(date).format('YYYY-MM-DD');
    }
}

export const newdateformat = (date) => {
    if (date) {
        return moment(date).format('DD-MM-YYYY');
    }
}

export const newdateformat2 = (date) => {
    if (date) {
        return moment(date).format('DD/MM/YYYY');
    }
}

export const dateTimeFormat = (date) => {
    if (date) {
        return moment().format('lll');
    }
}

export const timehr = (date) => {
    if (date) {
        return moment().format('HH:MM');
    }
}

export const time12hr = (date) => {
    if (date) {
        return moment(date).format('hh:mm a');
    }
}


export const getDifference = (value1, value2) => {
    let date1 = moment(value1, 'DD-MM-YYYY');
    let date2 = moment(value2, 'DD-MM-YYYY');
    let daysDiff = date1.diff(date2, 'days');
    return (daysDiff > 6);
}

export const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    // Strip hours minutes seconds etc.
    let currentDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
    );
    while (currentDate <= endDate) {
        dates.push( moment(currentDate).format('dddd'));
        currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1, // Will increase month if over range
        );
    }

    return dates;
}

export const getDayName = (item) => {
    return  moment(item).format('dddd');
}

export const getDateNumberOnly = (item) => {
    return moment(item).format('DD')
}

export const getMonthOnly = (item) => {
    return moment(item).format('MMMM')
}