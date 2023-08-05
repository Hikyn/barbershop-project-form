import "../styling/BarberCard.scss";
import { IBarber } from "../interfaces/interfaces";

interface Props {
  barber: IBarber;
  description: string;
  handleChange: (event: any) => void;
}

const BarberCard: React.FC<Props> = ({ barber, description, handleChange }) => {
  // Component that renders information about current barber
  
  return (
    <label htmlFor={barber._id} className="oneBarber">
      <div key={"barber" + barber._id} className="card">
        <input
          type="button"
          id={barber._id}
          name="barber"
          value={barber.first_name + " " + barber.last_name}
          onClick={handleChange}
        ></input>
        <div className="description">{description}</div>
      </div>
    </label>
  );
};

export default BarberCard;
