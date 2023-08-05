import { useState } from "react";
import "../styling/StaffForm.scss";
import BarberCard from "./BarberCard";
import { IBarber } from "../interfaces/interfaces";

interface Props {
  availableStaff: IBarber[];
  setFormBarber: (barber: IBarber) => void;
}

const StaffForm: React.FC<Props> = ({ availableStaff, setFormBarber }) => {
  const [noPreferenceBarber, setNoPreferenceBarber] = useState<IBarber>({
    _id: "000",
    first_name: "No",
    last_name: "Preference",
    phone_number: 0,
  });
  function onSubmitButton(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const target = event.target as typeof event.target & {
      id: string;
    };
    // If customer has no preference over barbers
    if (target.id === "000") {
      setFormBarber(noPreferenceBarber);
    }
    for (let i = 0; i < availableStaff.length; i += 1) {
      if (availableStaff[i]._id === target.id) {
        setFormBarber(availableStaff[i]);
        return;
      }
    }
  }

  return (
    <form className="staffForm">
      <h1 className="sectionAnnounce">Select barber: </h1>
      <div className="barbers">
        <BarberCard
          barber={noPreferenceBarber}
          handleChange={onSubmitButton}
          description={"Maximum availability"}
        />
        {availableStaff.map((barber) => {
          return (
            <BarberCard
              barber={barber}
              handleChange={onSubmitButton}
              description={"Head Barber"}
              key={barber._id}
            />
          );
        })}
      </div>
    </form>
  );
};

export default StaffForm;
