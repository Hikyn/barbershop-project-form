import '../styling/BarberCard.scss';

interface Barber {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: number;
}

interface Props {
    barber: Barber;
    description: string;
    handleChange: (event: any) => void;
}

const BarberCard: React.FC<Props> = ({ barber, description, handleChange }) => {
  return (
        <label htmlFor={barber._id} className='oneBarber'>
            <div key={'barber' + barber._id} className='card'>
                <input type='button' id={barber._id} name='barber' value={barber.first_name + " " + barber.last_name} onClick={handleChange}></input>
                <div className='description'>{description}</div>
            </div>
        </label>
    );
}

export default BarberCard;

