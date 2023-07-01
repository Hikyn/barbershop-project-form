import React, { useState } from 'react';
import '../styling/App.scss';
import LocationForm from './LocationForm'

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
  const [locations, setLocations] = useState(['Ippokratous', 'Parasiou 28']);

  const setFormLocation = (location: string) => {
    let copyForm: Form = {...form}
    copyForm.selected_location = location;
    setForm(copyForm);
    setStep(step + 1);
  }
  // This component will render 5 different form components, all of them will change state.
  return (
    <div className="App">
      <header className="App-header">
        <h1>Step {step} of 5</h1>
        {step === 1 &&
          <LocationForm locations={locations} setFormLocation={setFormLocation}/>
        } 
      </header>
    </div>
  );
}

export default App;
