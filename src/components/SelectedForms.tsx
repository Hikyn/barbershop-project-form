import { useEffect, useState } from 'react';
import '../styling/SelectedForms.scss';
import ServiceCard from './ServiceCard'; 

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
  selected_date?: Date;
}

interface Props {
    form: Form;
}

const SelectedForms: React.FC<Props> = ({ form }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function calculateTotal(){
      let sum = 0;
      form.selected_services?.forEach((service) => {
        sum+= service.price;
      })
      setTotal(sum);
    }

    calculateTotal();
  }, [form])

  return (
    <div className='selectedForms'>
      <h2>{form.selected_location?.name}</h2>
      <div className='description'>{form.selected_location?.location}, {form.selected_location?.map_index}</div>
      <hr></hr>
      {Number(form.selected_services?.length) > 0 ?
        form.selected_services?.map((service) => {
          return (
            <div className='flex-column'>
              <div>
                <div>{service.name}</div>
                <div className='description'>{service.time} min</div>
              </div>
              <div>${service.price}</div>
            </div>
          )
        }) : <div className='description'>No services selected yet</div>}
      <hr></hr>
      {Number(form.selected_services?.length) > 0 ?
      <div className='total'>
        <div className='leftSide'>
          <h3>Total:</h3>
        </div>
        <div className='rightSide'>
          <h3>${total}</h3>
        </div>
      </div> 
      : 
      <div className='total'>
        <div className='leftSide'>
          <h3>Total:</h3>
        </div>
        <div className='rightSide'>
          <h3>Free</h3>
        </div>
      </div>}
    </div>
  );
}

export default SelectedForms;
