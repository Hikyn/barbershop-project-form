import { useEffect, useState } from "react";
import "../styling/DayCard.scss";

interface Props {
  day: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DayCard: React.FC<Props> = ({ day, selectedDate, setSelectedDate }) => {
  const [dayName, setDayName] = useState("");
  const [monthes, setMonthes] = useState([
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  function handleClick(e: any) {
    e.preventDefault();
    setSelectedDate(day);
  }

  useEffect(() => {
    const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setDayName(daysOfTheWeek[day.getDay()]);
  }, [day]);

  return (
    <button
      className={
        day.getDate() === selectedDate.getDate()
          ? `dayCard selected`
          : "dayCard"
      }
      onClick={handleClick}
    >
      <div className="month">{monthes[day.getMonth()]}</div>
      <div>{dayName}</div>
      <div className="date">{day.getDate()}</div>
    </button>
  );
};

export default DayCard;
