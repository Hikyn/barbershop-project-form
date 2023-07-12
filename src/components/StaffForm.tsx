import '../styling/Location.scss';

interface Barber {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: number;
}

interface Props {
    availableStaff: Barber[];
    setFormBarber: (barber: Barber) => void;
}

const StaffForm: React.FC<Props> = ({ availableStaff, setFormBarber }) => {
  // This component will render 5 different form components, all of them will change state.
  function onSubmitButton(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const target = event.target as typeof event.target & {
        barber: { value: string };
    };
    console.log(target.barber.value);
    for (let i = 0; i < availableStaff.length; i += 1) {
        if (availableStaff[i]._id === target.barber.value) {
            setFormBarber(availableStaff[i]);
            return;
        }
    }
  };

  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <h1 className='sectionAnnounce'>Select barber: </h1>
        {availableStaff.map((barber) => {
            return (
                <div key={'barber' + barber._id}>
                    <input type='radio' id={'barber' + barber._id} name='barber' value={barber._id}></input>
                    <label htmlFor={'barber' + barber._id}>{barber.first_name + " " + barber.last_name}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default StaffForm;
