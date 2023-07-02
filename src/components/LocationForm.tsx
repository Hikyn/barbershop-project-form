import { FormEventHandler, useEffect, useState } from 'react';
import '../styling/Location.scss';
import { json } from 'stream/consumers';

interface Props {
    setFormLocation: (locations: string) => void;
}

interface Location {
  _id?: string,
  location?: string,
  map_index?: number,
  name?: string
}

const LocationForm: React.FC<Props> = ({ setFormLocation }) => {
  const [barbershops, setBarbershops] = useState<Location[]>([]);

  // This component will render 5 different form components, all of them will change state.
  function onSubmitButton(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const target = event.target as typeof event.target & {
        location: { value: string };
    };
    console.log(target.location.value);
    setFormLocation(target.location.value);
  };

  async function getBarbershops(){
    const url = new URL("http:/localhost:3000/barbershops");
    const res = await fetch(url, {
      method: "GET"
    })
    const data = await res.json();
    //console.log(data)
    console.log("Requesting locations")
    setBarbershops(data);
  }

  useEffect(() => {
    getBarbershops();
  }, [])

  useEffect(() => {
    //console.log(barbershops);
  }, [barbershops])
    
  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <legend>Select preferred location: </legend>
        <ul>
        {barbershops.map((location) => {
            return (
                  <li key={location._id}>
                    <input type='radio' id={'location' + location._id} name='location' value={location.name}></input>
                    <label htmlFor={'location' + location._id}>{location.name}</label>
                  </li>
        )})}
        </ul>
        <button type="submit">Submit</button>
    </form>
  );
}

export default LocationForm;
