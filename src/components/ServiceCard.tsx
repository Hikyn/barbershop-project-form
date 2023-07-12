import { FormEventHandler, useEffect, useState } from 'react';
import '../styling/Location.scss';
import { json } from 'stream/consumers';
import barbershopFront from '../images/barbershop-front.png';
import barbershopFront2 from '../images/barbershop-front2.png';

interface Service {
    _id: string;
    name: string;
    price: number;
    time: number;
    category: string;
    description: string;
  }

interface Props {
    service: Service,
}


const LocationCard: React.FC<Props> = ({ service }) => {

  return (
    <div key={"service" + service._id}>
        <label className='flex-column' htmlFor={'service' + service._id}>
            <div className='leftPart'>
            <input type='checkbox' className='checkbox-round' id={'service' + service._id} name='service' value={service._id}></input>
            <h3>{service.name}</h3>
            <p className='time'>{service.time} min</p>
            <p className='description'>{service.description}</p>
            </div>
            <div className='rightPart'>
            <h3>${service.price}</h3>
            </div>
        </label>
    </div>
    );
}

export default LocationCard;

