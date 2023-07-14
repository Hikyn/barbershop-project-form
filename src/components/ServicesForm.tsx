import '../styling/ServicesForm.scss';
import { FormEventHandler, useEffect, useState } from 'react';
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
    increaseStep: () => void;
    setFormServices: (services: Service[], increaseStep: boolean) => void;
}

const ServicesForm: React.FC<Props> = ({ form, increaseStep, setFormServices }) => {
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [hairServices, setHairServices] = useState<Service[]>([]);
  const [beardServices, setBeardServices] = useState<Service[]>([]);
  const [facialServices, setFacialServices] = useState<Service[]>([]);
  const [shaveServices, setShaveServices] = useState<Service[]>([]);
  const [packageServices, setPackageServices] = useState<Service[]>([]);
  // This component will render 5 different form components, all of them will change state.
  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    let checkboxes: NodeList = document.querySelectorAll('.checkbox-round');

    let selected_services: Service[] = [];
    for (let i = 0; i < checkboxes.length; i += 1) {
        let node = checkboxes[i] as HTMLInputElement;
        console.log(node)
        if (node.checked) {
          let service = availableServices.find((service) => service._id === node.id)
          if (service !== undefined) {
            selected_services.push(service);
          }
        }
    }

    setFormServices(selected_services, false);
  };

  function onSubmitButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    increaseStep();
  };

  useEffect(() => {
    // On mount request services from REST api
    async function getServices(){
      const url = new URL("http:/localhost:3000/services");
      const res = await fetch(url, {
        method: "GET"
      })
      const data = await res.json();
      //console.log(data)
      console.log("Requesting services")
      setAvailableServices(data);
    }

    getServices();
  }, [])

  useEffect(() => {
    // Hook for updating services categories when we finally receive them from REST api
    function getServicesCategories() {
      let hairArray: Service[] = [];
      let beardArray: Service[] = [];
      let facialArray: Service[] = [];
      let shaveArray: Service[] = [];
      let packageArray: Service[] = [];
      availableServices.forEach((service) => {
        if (service.category === "Hair") {
          hairArray.push(service);
        } else if (service.category === "Beard") {
          beardArray.push(service);
        } else if (service.category === "Facial Treatment") {
          facialArray.push(service);
        } else if (service.category === "Shave") {
          shaveArray.push(service);
        } else if (service.category === "Packages & Combos") {
          packageArray.push(service);
        }
      })
      setHairServices(hairArray);
      setBeardServices(beardArray);
      setFacialServices(facialArray);
      setShaveServices(shaveArray);
      setPackageServices(packageArray);
    }

    getServicesCategories();
  }, [availableServices])

  return (
    <form className="serviceForm" onSubmit={onSubmitButton}>
        <h1 className='sectionAnnounce'>Select services: </h1>
        <h2>Hair</h2>
        <div className='card'>
          {hairServices.map((service) => {
              return (
                <ServiceCard service={service} onChange={handleChange}/>
          )})}
        </div>

        <h2>Beard</h2>
        <div className='card'>
          {beardServices.map((service) => {
              return (
                <ServiceCard service={service} onChange={handleChange}/>
          )})}
        </div>

        <h2>Facial Treatment</h2>
        <div className='card'>
          {facialServices.map((service) => {
              return (
                <ServiceCard service={service} onChange={handleChange}/>
          )})}
        </div>

        <h2>Shave</h2>
        <div className='card'>
          {shaveServices.map((service) => {
              return (
                <ServiceCard service={service} onChange={handleChange}/>
          )})}
        </div>

        <h2>Packages & Combos</h2>
        <div className='card'>
          {packageServices.map((service) => {
              return (
                <ServiceCard service={service} onChange={handleChange}/>
          )})}
        </div>
        {Number(form.selected_services?.length) > 0 &&
        <footer>
          <button type="submit">Book now</button>
        </footer>}
    </form>
  );
}

export default ServicesForm;
