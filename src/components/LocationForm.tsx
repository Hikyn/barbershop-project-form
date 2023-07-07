import { FormEventHandler, useEffect, useState } from 'react';
import '../styling/Location.scss';
import { json } from 'stream/consumers';

interface Props {
    setFormLocation: (location: Location) => void;
}

interface Location {
  _id: string,
  location: string,
  map_index: number,
  name: string
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
    barbershops.forEach(barbershop => {
      if (barbershop._id === target.location.value) {
        setFormLocation(barbershop);
      }
    })
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

  const handleClick = (event: any) => {
    event.target.form.requestSubmit();
  }

  useEffect(() => {
    getBarbershops();
  }, [])

  useEffect(() => {
    //console.log(barbershops);
  }, [barbershops])
    
  return (
    <>
    <div className='sectionAnnounce'>Select preferred location</div>
    <form className="locationForm" onSubmit={onSubmitButton}>
      <div className="barbershops">
      {barbershops.map((location) => {
        return (
          <div key={'key' + location._id}>
            <input type='radio' id={location._id} name='location' value={location._id} onClick={handleClick}></input>
            <label htmlFor={location._id}>
              {location.name}
              <p>Located in {location.location}, Athens, Greece</p>
              <p>{location.map_index}</p>
              <p>Open: Monday - Saturday</p>
              <p>9:00 - 18:00</p>
            </label>
          </div>
      )})}
      </div>
      <button type="submit">Submit</button>
    </form>
    </>);
}

export default LocationForm;
