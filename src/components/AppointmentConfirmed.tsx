import { useState } from "react";
import { IForm } from "../interfaces/interfaces";
import "../styling/AppointmentConfirmed.scss";

interface Props {
  form: IForm;
}

const AppointmentConfirmed: React.FC<Props> = ({ form }) => {
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

  function getMinutes(timeslot: number) {
    return String(timeslot).slice(-2);
  }

  function getHours(timeslot: number) {
    let length = String(timeslot).length;

    if (length > 3) {
      return String(timeslot).slice(0, 2);
    } else {
      return String(timeslot).slice(0, 1);
    }
  }

  return (
    <div className="confirmation">
      <h1>Appointment confirmed!</h1>
      <h2>{form.selected_location?.name}</h2>
      <div className="description">
        {form.selected_location?.location}, {form.selected_location?.map_index}
      </div>
      {form.selected_timeslot !== undefined &&
        form.selected_month !== undefined && (
          <div className="timeDescription">
            {form.selected_day} of {monthes[form.selected_month]}{" "}
            {form.selected_year} at {getHours(form.selected_timeslot)}:
            {getMinutes(form.selected_timeslot)}
          </div>
        )}
      <div>You may close this window</div>
    </div>
  );
};

export default AppointmentConfirmed;
