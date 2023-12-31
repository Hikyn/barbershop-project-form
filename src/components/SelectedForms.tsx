import { useEffect, useState } from "react";
import "../styling/SelectedForms.scss";
import { IForm } from "../interfaces/interfaces";
import ServiceCard from "./ServiceCard";
import { getMinutes, getHours } from "../__helpers__/utils";

interface Props {
  form: IForm;
}

const SelectedForms: React.FC<Props> = ({ form }) => {
  const [total, setTotal] = useState(0);
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

  useEffect(() => {
    function calculateTotal() {
      let sum = 0;
      form.selected_services?.forEach((service) => {
        sum += service.price;
      });
      setTotal(sum);
    }

    calculateTotal();
  }, [form]);

  return (
    <div className="selectedForms">
      <h2>{form.selected_location?.name}</h2>
      <div className="description">
        {form.selected_location?.location}, {form.selected_location?.map_index}
      </div>
      <hr></hr>
      {form.selected_timeslot !== undefined &&
        form.selected_month !== undefined && (
          <>
            <div className="timeDescription">
              {form.selected_day} of {monthes[form.selected_month]}{" "}
              {form.selected_year} at {getHours(form.selected_timeslot)}:
              {getMinutes(form.selected_timeslot)}
            </div>
            <hr></hr>
          </>
        )}
      {Number(form.selected_services?.length) > 0 ? (
        form.selected_services?.map((service) => {
          return (
            <div className="flex-column" key={service.name}>
              <div>
                <div>{service.name}</div>
                <div className="description">{service.time} min</div>
              </div>
              <div>${service.price}</div>
            </div>
          );
        })
      ) : (
        <div className="description">No services selected yet</div>
      )}
      <hr></hr>
      {Number(form.selected_services?.length) > 0 ? (
        <div className="total">
          <div className="leftSide">
            <h3>Total:</h3>
          </div>
          <div className="rightSide">
            <h3>${total}</h3>
          </div>
        </div>
      ) : (
        <div className="total">
          <div className="leftSide">
            <h3>Total:</h3>
          </div>
          <div className="rightSide">
            <h3>Free</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedForms;
