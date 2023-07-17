import React, { useEffect, useState } from 'react';
import '../styling/App.scss';
import LocationForm from './LocationForm';
import ServicesForm from './ServicesForm';
import StaffForm from './StaffForm';
import SelectedForms from './SelectedForms';
import DateForm from './DateForm';
import ContactForm from './ContactForm';
import AppointmentConfirmed from './AppointmentConfirmed';

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

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [availableStaff, setAvailableStaff] = useState<Barber[]>([]);
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

  const setFormLocation = (location: Location) => {
    let copyForm: Form = {...form}
    copyForm.selected_location = location;
    setForm(copyForm);
    setStep(step + 1);
    getBarbers(location._id);
  }

  const setFormServices = (services: Service[], increaseStep: boolean) => {
    let copyForm: Form = {...form}
    copyForm.selected_services = services;
    setForm(copyForm);
    if (increaseStep) {
      setStep(step + 1);
    }
  }

  const setFormBarber = (barber: Barber) => {
    let copyForm: Form = {...form}
    copyForm.selected_barber = barber;
    setForm(copyForm);
    setStep(step + 1);
  }

  const setFormCustomer = async (customer: Customer) => {
    let copyForm: Form = {...form}
    copyForm.customer = customer;
    setForm(copyForm);
    if (form.customer !== undefined) {
      let id = createCustomer(form.customer);
      id.then(id => createAppointment(id));
    } 
  }

  const setFormTime = (day: Date, timeslot: number) => {
    let copyForm: Form = {...form}
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

  
  useEffect(() => {
    //console.log(form);
    if (form.customer !== undefined && isFormSent === false) {
      let id = createCustomer(form.customer);
      id.then(id => createAppointment(id));
      setIsFormSent(true);
      setStep(step + 1);
    }
  }, [form, isFormSent]);

  const createCustomer = async (customer: Customer) => {
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
        {step <= 5 ? <p>Step {step} of 5</p> : <></>}
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
