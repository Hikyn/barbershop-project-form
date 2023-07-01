import '../styling/Location.scss';

interface Barber {
    name: string | undefined;
    job_title: string | undefined;
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
        if (availableStaff[i].name === target.barber.value) {
            setFormBarber(availableStaff[i]);
            return;
        }
    }
  };

  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <legend>Select preferred barber: </legend>
        {availableStaff.map((barber) => {
            return (
                <div>
                    <input type='radio' id={'barber' + barber.name} name='barber' value={barber.name}></input>
                    <label htmlFor={'barber' + barber.name}>{barber.name}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default StaffForm;
