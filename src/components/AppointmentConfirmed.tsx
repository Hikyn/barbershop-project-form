import { useState } from 'react';
import '../styling/AppointmentConfirmed.scss';
interface Service {
    _id: string;
    name: string;
    price: number;
    time: number;
    category: string;
    description: string;
  }
  
interface Barber {
    _id: string;
    first_name: string;
    last_name: string;
    phone_number: number;
  }
  
interface Customer {
    _id: number | undefined;
    first_name: string,
    last_name: string,
    phone_number: number
  }

interface Location {
    _id: string,
    location: string,
    map_index: number,
    name: string
  }

interface Form {
    selected_location?: Location;
    selected_services?: Service[];
    selected_barber?: Barber;
    selected_day?: number;
    selected_month?: number;
    selected_year?: number;
    selected_timeslot?: number;
    customer?: Customer;
  }

interface Props {
    form: Form;
}

const AppointmentConfirmed: React.FC<Props> = ({ form }) => {
    const [monthes, setMonthes] = useState(['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

    function getMinutes(timeslot: number) {
        return (String(timeslot).slice(-2));
    }
    
    function getHours(timeslot: number) {
        let length = String(timeslot).length;
        
        if (length > 3) {
            return String(timeslot).slice(0, 2);
        } else {
            return String(timeslot).slice(0, 1);
        }
    }

    return (
        <div className='confirmation'>
            <h1>Appointment confirmed!</h1>
            <h2>{form.selected_location?.name}</h2>
            <div className='description'>{form.selected_location?.location}, {form.selected_location?.map_index}</div>
            {form.selected_timeslot !== undefined && form.selected_month !== undefined &&
                <div className='timeDescription'>{form.selected_day} of {monthes[form.selected_month]} {form.selected_year} at {getHours(form.selected_timeslot)}:{getMinutes(form.selected_timeslot)}</div>
            }
            <div>You may close this window</div>
        </div>
        );
}

export default AppointmentConfirmed;

