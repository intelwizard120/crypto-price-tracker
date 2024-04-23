import { n } from "vitest/dist/reporters-P7C2ytIv";

export const formatNumber = value => {
  value = Math.floor(value * 1000) / 1000;
  let numberString = value.toString();

  // Split the string into integer and decimal parts (if any)
  let parts = numberString.split('.');

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts (if any)
  return parts.join('.');
};


export const shorten = (value: string, num:number = 5):string => {
  if(!value || !value.length) return '';
  if(value.length > 12) {
    const left = value.slice(0, num + 2);
    const right = value.slice(value.length - (num), value.length);
    return left + "..." + right;
  }
  return value;
}

export const formatDate = (date:Date):string => {
  if(!(date instanceof Date)) return '';
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

export const formatDateFromStr = (dateStr:string):string => {
  const date = new Date(dateStr);
  if(!(date instanceof Date)) return '';
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

export const formatTime = (date:Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Format the time string as "hh:mm:ss"
  const timeString = `${hours}:${minutes}:${seconds}`;
  return timeString;
}

export const formatDateTime = (dateStr:string):string => {
  const date = new Date(dateStr);
  return formatDate(date) + " " + formatTime(date);
}