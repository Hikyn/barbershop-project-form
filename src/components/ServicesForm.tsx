import '../styling/Location.scss';
import { FormEventHandler, useEffect, useState } from 'react';

interface Service {
    _id: string;
    name: string;
    price: number;
    duration: number;
  }

interface Props {
    setFormServices: (services: Service[]) => void;
}

const ServicesForm: React.FC<Props> = ({ setFormServices }) => {
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
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
  useEffect(() => {
    getServices();
  }, [])

  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <h1 className='sectionAnnounce'>Select preferred services: </h1>
        {availableServices.map((service) => {
            return (
                <div key={"service" + service._id}>
                    <input type='checkbox' className='checkbox' id={'service' + service.name} name='service' value={service._id}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default ServicesForm;
