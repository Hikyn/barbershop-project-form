import React, { useEffect, useState } from 'react';
import '../styling/App.scss';
import LocationForm from './LocationForm';
import ServicesForm from './ServicesForm';
import StaffForm from './StaffForm';

interface Service {
  name: string | undefined;
  price: number | undefined;
  duration: number | undefined;
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

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableStaff, setAvailableStaff] = useState<Barber[]>([]);


  async function getBarbers(barbershopId: string){
    const url = new URL(`http:/localhost:3000/barbershops/${barbershopId}/barbers`);
    const res = await fetch(url, {
      method: "GET"
    })
    const data = await res.json();
    console.log(data)
    console.log("Requesting barbers")
    setAvailableStaff(data);
  }

  const setFormLocation = (location: Location) => {
    let copyForm: Form = {...form}
    copyForm.selected_location = location;
    setForm(copyForm);
    setStep(step + 1);
    getBarbers(location._id);
  }

  const setFormServices = (services: Service[]) => {
    let copyForm: Form = {...form}
    copyForm.selected_services = services;
    setForm(copyForm);
    setStep(step + 1);
  }

  const setFormBarber = (barber: Barber) => {
    let copyForm: Form = {...form}
    copyForm.selected_barber = barber;
    setForm(copyForm);
    setStep(step + 1);
  }
  useEffect(() => {
    console.log(form);
  }, [form]);

  // This component will render 5 different form components, all of them will change state.
  return (
    <div className="App">
      <header className="App-header">
        <p>Step {step} of 5</p>
        {step === 1 &&
          <LocationForm setFormLocation={setFormLocation}/>
        } {step === 2 &&
          <ServicesForm setFormServices={setFormServices}/>
        } {step === 3 &&
          <StaffForm availableStaff={availableStaff} setFormBarber={setFormBarber}/>
        } 
      </header>
    </div>
  );
}

export default App;
