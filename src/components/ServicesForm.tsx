import '../styling/ServicesForm.scss';
import { FormEventHandler, useEffect, useState } from 'react';

interface Service {
    _id: string;
    name: string;
    price: number;
    duration: number;
    category: string;
  }

interface Props {
    setFormServices: (services: Service[]) => void;
}

const ServicesForm: React.FC<Props> = ({ setFormServices }) => {
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [hairServices, setHairServices] = useState<Service[]>([]);
  const [beardServices, setBeardServices] = useState<Service[]>([]);
  const [facialServices, setFacialServices] = useState<Service[]>([]);
  const [shaveServices, setShaveServices] = useState<Service[]>([]);
  const [packageServices, setPackageServices] = useState<Service[]>([]);
  // This component will render 5 different form components, all of them will change state.
  function onSubmitButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let checkboxes: NodeList = document.querySelectorAll('.checkbox');

    let selected_services: Service[] = [];
    for (let i = 0; i < checkboxes.length; i += 1) {
        let node = checkboxes[i] as HTMLInputElement;
        if (node.checked) {
          selected_services.push(availableServices[i]);
        }
    }
    
    setFormServices(selected_services);
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
    <form className="locationForm" onSubmit={onSubmitButton}>
        <h1 className='sectionAnnounce'>Select services: </h1>
        <h2>Hair</h2>
        {hairServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox-round' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <h2>Beard</h2>
        {beardServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox-round' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <h2>Facial Treatment</h2>
        {facialServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox-round' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <h2>Shave</h2>
        {shaveServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox-round' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <h2>Packages & Combos</h2>
        {packageServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox-round' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default ServicesForm;
