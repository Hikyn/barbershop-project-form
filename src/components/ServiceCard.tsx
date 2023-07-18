import '../styling/ServiceCard.scss';
import { IService } from '../interfaces/interfaces';

interface Props {
    service: IService,
    onChange: (e: any) => void;
}


const LocationCard: React.FC<Props> = ({ service, onChange }) => {

  return (
    <div key={"service" + service._id} className='oneService'>
        <label className='flex-column' htmlFor={service._id}>
            <div className='leftPart'>
            <input type='checkbox' className='checkbox-round' id={service._id} name='service' value={service._id} onChange={onChange}></input>
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

