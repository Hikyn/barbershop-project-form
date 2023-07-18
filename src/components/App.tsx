import React, { useEffect, useState } from 'react';
import { IBarber, ICustomer, IForm, ILocation, IService } from '../interfaces/interfaces';
import '../styling/App.scss';
import LocationForm from './LocationForm';
import ServicesForm from './ServicesForm';
import StaffForm from './StaffForm';
import SelectedForms from './SelectedForms';
import DateForm from './DateForm';
import ContactForm from './ContactForm';
import AppointmentConfirmed from './AppointmentConfirmed';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IForm>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableStaff, setAvailableStaff] = useState<IBarber[]>([]);
  const [isFormSent, setIsFormSent] = useState(false);

  async function getBarbers(barbershopId: string){
    const url = new URL(`http:/localhost:3000/barbershops/${barbershopId}/barbers`);
    const res = await fetch(url, {
      method: "GET"
    })
    const data = await res.json();
    //console.log(data)
    console.log("Requesting barbers")
    setAvailableStaff(data);
  }

  const setFormLocation = (location: ILocation) => {
    let copyForm: IForm = {...form}
    copyForm.selected_location = location;
    setForm(copyForm);
    setStep(step + 1);
    getBarbers(location._id);
  }

  const setFormServices = (services: IService[], increaseStep: boolean) => {
    let copyForm: IForm = {...form}
    copyForm.selected_services = services;
    setForm(copyForm);
    if (increaseStep) {
      setStep(step + 1);
    }
  }

  const setFormBarber = (barber: IBarber) => {
    let copyForm: IForm = {...form}
    copyForm.selected_barber = barber;
    setForm(copyForm);
    setStep(step + 1);
  }

  const setFormCustomer = async (customer: ICustomer) => {
    let copyForm: IForm = {...form}
    copyForm.customer = customer;
    setForm(copyForm);
    if (form.customer !== undefined) {
      let id = createCustomer(form.customer);
      id.then(id => createAppointment(id));
    } 
  }

  const setFormTime = (day: Date, timeslot: number) => {
    let copyForm: IForm = {...form}
    copyForm.selected_day = day.getDate();
    copyForm.selected_month = day.getMonth() + 1;
    copyForm.selected_year = day.getFullYear();
    copyForm.selected_timeslot = timeslot;
    setForm(copyForm);
    setStep(step + 1);
  }

  const increaseStep = () => {
    setStep(step + 1);
  }

  const decreaseStep = () => {
    setStep(step - 1);
  }

  
  useEffect(() => {
    //console.log(form);
    if (form.customer !== undefined && isFormSent === false) {
      let id = createCustomer(form.customer);
      id.then(id => createAppointment(id));
      setIsFormSent(true);
      setStep(step + 1);
    }
  }, [form, isFormSent]);

  const createCustomer = async (customer: ICustomer) => {
    const url = new URL(`http://localhost:3000/customers/`);
    const res = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(customer)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Creating customer");
      console.log(`Customer ID: ${data}`);
      return data;
    })
    console.log(res);
    return res;
  }
  const createAppointment = async (id: any) => {
    console.log(`Creating appointment for customer ID: ${id}`)
    const appointment = {
      date: {
        day: form.selected_day,
        month: form.selected_month,
        year: form.selected_year
      },
      location: form.selected_location,
      barber: form.selected_barber,
      services: form.selected_services,
      customer_id: id,
      status: 'Scheduled', 
      timeslot: Number(form.selected_timeslot)
    }
    const url = new URL(`http://localhost:3000/appointments`);
    const res = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(appointment)
    })
    const data = await res.json();
    if (data.isCreated === true) {
      console.log("Appointment created")
    }
  }

  // This component will render 5 different form components, all of them will change state.
  return (
    <div className="App">
      <header className="App-header">
        { step === 1 && 
          <p>Step {step} of 5</p> 
        }
        {step >= 2 && step <= 5 ? 
        <div className='flex-row'>
          <button onClick={decreaseStep}>&lt;</button>
          <p>Step {step} of 5</p> 
        </div>
        : <></>}
        {step === 1 &&
          <LocationForm setFormLocation={setFormLocation}/>
        } {step === 2 &&
          <div className="twoSections">
            <ServicesForm form={form} setFormServices={setFormServices} increaseStep={increaseStep}/>
            <SelectedForms form={form}/>
          </div>
        } {step === 3 &&
          <div className="twoSections">
            <StaffForm availableStaff={availableStaff} setFormBarber={setFormBarber}/>
            <SelectedForms form={form}/>
          </div>
        } {step === 4 &&
          <div className="twoSections">
            <DateForm barber={form.selected_barber} setFormTime={setFormTime}/>
            <SelectedForms form={form}/>
          </div>
        } {step === 5 &&
          <div className="twoSections">
            <ContactForm setFormCustomer={setFormCustomer}/>
            <SelectedForms form={form}/>
          </div>
        }  {step === 6 && 
          <AppointmentConfirmed form={form}/>
        }
      </header>
    </div>
  );
}

export default App;
