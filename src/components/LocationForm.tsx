import { FormEventHandler, useEffect, useState } from 'react';
import '../styling/Location.scss';
import { json } from 'stream/consumers';
import LocationCard from './LocationCard'; 

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
    //console.log(target.location.value);
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
    <h1 className='sectionAnnounce'>Select location</h1>
    <div className='locationCounter'>
      <h2>Example barbershop</h2>
      <div>{barbershops.length} locations</div>
    </div>
    <form className="locationForm" onSubmit={onSubmitButton}>
      <div className="barbershops">
      {barbershops.map((location) => {
        return (
          <LocationCard location={location} onSubmitButton={onSubmitButton} handleClick={handleClick} />
      )})}
      </div>
      <button type="submit" hidden>Submit</button>
    </form>
    </>);
}

export default LocationForm;
