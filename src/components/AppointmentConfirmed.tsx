import { useState } from "react";
import { IForm } from "../interfaces/interfaces";
import "../styling/AppointmentConfirmed.scss";
import { getMinutes, getHours } from "../__helpers__/utils";

interface Props {
  form: IForm;
}

const AppointmentConfirmed: React.FC<Props> = ({ form }) => {
  // Component that renders final confirmation screen 
  
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
            {form.selected_day} of {monthes[form.selected_month - 1]}{" "}
            {form.selected_year} at {getHours(form.selected_timeslot)}:
            {getMinutes(form.selected_timeslot)}
          </div>
        )}
      <div>You may close this window</div>
    </div>
  );
};

export default AppointmentConfirmed;
