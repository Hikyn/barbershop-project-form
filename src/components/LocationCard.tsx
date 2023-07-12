import { FormEventHandler, useEffect, useState } from 'react';
import '../styling/Location.scss';
import { json } from 'stream/consumers';

interface Location {
  _id: string,
  location: string,
  map_index: number,
  name: string
}

interface Props {
    location: Location,
    onSubmitButton: any
    handleClick: any
}

const LocationCard: React.FC<Props> = ({ location, onSubmitButton, handleClick }) => {
  return (
    <div className='card' key={'key' + location._id}>
        <input type='radio' id={location._id} name='location' value={location._id} onClick={handleClick}></input>
        <label htmlFor={location._id}>
            <h1>{location.name}</h1>
            <p>Located in {location.location}, Athens, Greece</p>
            <p>{location.map_index}</p>
            <p>Open: Monday - Saturday</p>
            <p>9:00 - 18:00</p>
        </label>
    </div>
    );
}

export default LocationCard;

