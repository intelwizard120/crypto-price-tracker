import { n } from "vitest/dist/reporters-P7C2ytIv";

export const formatNumber = value => {
  value = Math.floor(value * 100000) / 100000;
  let numberString = value.toString();

  // Split the string into integer and decimal parts (if any)
  let parts = numberString.split('.');

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts (if any)
  return parts.join('.');
};


export const shorten = (value: string):string => {
  if(!value || !value.length) return '';
  if(value.length > 12) {
    const left = value.slice(0, 7);
    const right = value.slice(value.length - 5, value.length);
    return left + "..." + right;
  }
  return value;
}

export const formatDate = (date:Date):string => {
  if(!(date instanceof Date)) return '';
  return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}