import { FormEventHandler, useState } from 'react';
import '../styling/Location.scss';

interface Props {
    locations: string[];
    setFormLocation: (locations: string) => void;
}

const LocationForm: React.FC<Props> = ({ locations, setFormLocation }) => {
  // This component will render 5 different form components, all of them will change state.
  function onSubmitButton(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const target = event.target as typeof event.target & {
        location: { value: string };
    };
    console.log(target.location.value);
    setFormLocation(target.location.value);
  };

  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <legend>Select preferred location: </legend>
        {locations.map((location) => {
            return (
                <div>
                    <input type='radio' id={'location' + location} name='location' value={location}></input>
                    <label htmlFor={'location' + location}>{location}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default LocationForm;
