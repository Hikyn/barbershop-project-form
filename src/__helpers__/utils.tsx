import {
    IBarber,
    ICustomer,
    IForm,
    ILocation,
    IService,
  } from "../interfaces/interfaces";

/**
  * @param {number} Timeslot 1200 / 1730.
  * @return {string} "00" / "30"
  */
export const getMinutes = (timeslot: number) => {
  return String(timeslot).slice(-2);
};

/**
  * @param {number} Timeslot 1200 / 1730.
  * @return {string} "12" / "17"
  */
export const getHours = (timeslot: number) => {
  //
  let length = String(timeslot).length;

  if (length > 3) {
    return String(timeslot).slice(0, 2);
  } else {
    return String(timeslot).slice(0, 1);
  }
};

/**
  * @param {date} Date: "Sat Sep 13 275760 00:00:00 GMT+0000 (Coordinated Universal Time)"
  * @param {number} Days: 5, 8, 25.
  * @return {date} "Sat Sep 18 275760 00:00:00 GMT+0000 (Coordinated Universal Time)"
  */
export const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
