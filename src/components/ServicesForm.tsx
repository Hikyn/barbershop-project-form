import '../styling/Location.scss';

interface Service {
    name: string | undefined;
    price: number | undefined;
    duration: number | undefined;
  }

interface Props {
    availableServices: Service[];
    setFormServices: (services: Service[]) => void;
}

const ServicesForm: React.FC<Props> = ({ availableServices, setFormServices }) => {
  // This component will render 5 different form components, all of them will change state.
  function onSubmitButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let checkboxes: NodeList = document.querySelectorAll('.checkbox');

    let services: Service[] = [];
    for (let i = 0; i < checkboxes.length; i += 1) {
        let node = checkboxes[i] as HTMLInputElement;
        if (node.checked) {
            services.push(availableServices[i]);
        }
    }

    setFormServices(services);
  };

  return (
    <form className="locationForm" onSubmit={onSubmitButton}>
        <legend>Select preferred services: </legend>
        {availableServices.map((service) => {
            return (
                <div>
                    <input type='checkbox' className='checkbox' id={'service' + service.name} name='service' value={service.name}></input>
                    <label htmlFor={'service' + service.name}>{service.name}</label>
                </div>
        )})}
        <button type="submit">Submit</button>
    </form>
  );
}

export default ServicesForm;
