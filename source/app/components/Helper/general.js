import moment from "moment"
import { Linking } from "react-native";
import Constant from "../../../apis/constant";
import { Images } from "../../assets/global_style/images";

export function baseUrl(path) {
  if (path && path !== null && path !== '') return { uri: Constant.image + path };
  else return Images.user;
}

export function renderImage(image, size = 'small') {
  if (typeof image === 'string') {
    return image ? baseUrl(image) : null;
  } else if (size == 'original') {
    return image && image.original && image.original !== ``
      ? baseUrl(image.original)
      : image && image.original && image.original !== ``
        ? baseUrl(image.original)
        : null;
  } else if (size == 'large') {
    return image && image.large && image.large !== ``
      ? baseUrl(image.large)
      : image && image.original && image.original !== ``
        ? baseUrl(image.original)
        : null;
  } else if (size === 'medium') {
    return image && image.medium && image.medium !== ``
      ? baseUrl(image.medium)
      : image && image.original && image.original !== ``
        ? baseUrl(image.original)
        : null;
  } else {
    return image && image.small && image.small !== ``
      ? baseUrl(image.small)
      : image && image.original && image.original !== ``
        ? baseUrl(image.original)
        : Images.logo;
  }
}


export const checkInOutDate = (date) => {
  if (date) {
    return moment(date).format('LT');
  }
}


export const time24hours = (date) => {
  if (date) {
    return moment(date).format('HH:MM:ss');
  }
}

export const dateFormat = (date) => {
  if (date) {
    return moment(date).format('DD MMM, YYYY');
  }
}

export const monthYeardateFormat = (date) => {
  if (date) {
    return moment(date).format('MMM, YYYY');
  }
}
export const updatedDateFormated = (date) => {
  if (date) {
    return moment(date).format('YYYY-MM-DD')
  }
}

export const newDateFormat = (data) => {
  if (data) {
    return moment(data).format('llll')
  }
}

export const spineTimer = (date) => {
  if (date) {
    let mili = moment(date).valueOf()
    let newMili = mili + 10800000
    let newdate = moment(newMili).format('HH:mm:ss');
    return newdate
  }
  else return;
}

export const DateFormat = (data) => {
  // console.log(data,'....................');
  // let date = new Date(data);
  // console.log(date,'.date');
  // let d = date.getDate();
  // d = d < 10 ? '0' + d : d;

  // let m = date.getMonth() + 1;
  // m = m < 10 ? '0' + m : m;

  // let y = date.getFullYear();
  // console.log(d, m, y,'....date.......dhjdj ');

  // if (data) {
  //   return moment(data).format('ddd, MM MMM YY')
  // }
}

export const timeFormat = (time) => {
  if (time) {
    return moment(time).format('HH:mm')
  }
}

export const timeFormatDisplay = (time) => {
  if (time) {
    return moment(time).format('LT')
  }
}

export const spaceAfter4Digit = (data) => {
  if (data !== null && data !== '') {
    return data.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
  }
}

export const spaceAfter5Digit = (data) => {
  if (data !== null || data !== '') {
    return data.replace(/\W/gi, '').replace(/(.{5})/g, '$1 ')
  }
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const getName = (path) => {
  path = path.split('/');
  return path.length > 1 ? path[path.length - 1] : path;
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const numberFormet = (phonenumber) => {
  var string = phonenumber
  var phone = [string.slice(0, 5), "-", string.slice(5)].join('');
  return phone
}

export const isEmptyObj = (item) => {
  if (Object.keys(item).length === 0)
    return true
  else
    return false;
}

//Check Variables
export const isEmpty = (item) => {

  if (item === null) {
    return true
  }
  else if (item === '') {
    return true;
  }
  else if (item === undefined) {
    return true;
  }
  else {
    return false;
  }
}

export const numberFormat = amount => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const compareObj = (data1, data2) => {
  const result = JSON.stringify(data1) === JSON.stringify(data2);
  return result;
}


export const checkCurrentDAte = (date) => {
  let today = new Date();
  if (new Date(date).getFullYear() === today.getFullYear() &&
    new Date(date).getMonth() === today.getMonth() &&
    new Date(date).getDate() === today.getDate()) {
    return true;
  } else {
    return false
  }
}

export const checkCurrentTimedate = (time) => {
  let momentTime = moment(time, 'HH:mm a');
  let laterMomentTime = moment(moment(), 'HH:mm a');

  if (momentTime.isBefore(laterMomentTime)) {
    return true;
  }
  else {
    return false;
  }
}

export const checkAfterTime = (time) => {
  let momentTime = moment(time, 'HH:mm a');
  let laterMomentTime = moment(moment(), 'HH:mm a');

  if (laterMomentTime.isAfter(momentTime)) {
    return true;
  }
  else {
    return false;
  }
}

export const comapareTwoTimes = (time, time2) => {
  let momentTime = moment(time, 'HH:mm a');
  let laterMomentTime = moment(time2, 'HH:mm a');

  if (momentTime.isBefore(laterMomentTime)) {
    return true;
  }
  else {
    return false;
  }
}

export const UrlName = value => {
  let array = value.split('/')
  let name = array[array.length - 1]
  return name
};


export const openUrl = url => {
  if (url != '') {
    //   Linking.canOpenURL(url).then(supported => {
    //     if (!supported) {
    //       new Toaster().error('Not a valid Link');
    //     } else {
    return Linking.openURL(url);
    //   }
    // });
  }
};

export const getExtension = path => {
  path = path.split('/');
  let ext = path[path.length - 1].split('.');
  return ext.length > 1 ? ext[ext.length - 1].toLowerCase() : null;
};

export const removeUnderscore = (data) => {
  if (data) {
    var str = data;
    var newStr = str.replace(/_/g, " ");
    return newStr;
  }
}

export const compareTwoStrings = (data1, data2) => {
  if (data1 && data2) {
    const result = data1.toUpperCase() === data2.toUpperCase();
    return result;
  }
}