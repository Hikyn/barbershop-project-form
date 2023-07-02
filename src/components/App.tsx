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
  name: string | undefined;
  job_title: string | undefined;
}

interface Form {
  selected_location?: string;
  selected_services?: Service[];
  selected_barber?: Barber;
  selected_date?: Date;
}

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableLocations, setAvailableLocations] = useState(['Ippokratous', 'Parasiou 28']);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableStaff, setAvailableStaff] = useState<Barber[]>([
    {
      name: "Theo",
      job_title: "Head Barber"
    }, {
      name: "Maria",
      job_title: "Head Barber"
    }, {
      name: "Theodoros",
      job_title: "Head Barber"
    }
  ]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableServices, setAvailableServices] = useState<Service[]>([{
    name: 'Classic cut',
    price: 14,
    duration: 30
  }, {
    name: 'Skin fade',
    price: 15,
    duration: 30
  }, {
    name: 'Beard trim',
    price: 7,
    duration: 15
  }]);

  const setFormLocation = (location: string) => {
    let copyForm: Form = {...form}
    copyForm.selected_location = location;
    setForm(copyForm);
    setStep(step + 1);
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
    const url = new URL("http:/localhost:3000/barbers");
    fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }, [form]);
  // This component will render 5 different form components, all of them will change state.
  return (
    <div className="App">
      <header className="App-header">
        <h1>Step {step} of 5</h1>
        {step === 1 &&
          <LocationForm availableLocations={availableLocations} setFormLocation={setFormLocation}/>
        } {step === 2 &&
          <ServicesForm availableServices={availableServices} setFormServices={setFormServices}/>
        } {step === 3 &&
          <StaffForm availableStaff={availableStaff} setFormBarber={setFormBarber}/>
        } 
      </header>
    </div>
  );
}

export default App;
