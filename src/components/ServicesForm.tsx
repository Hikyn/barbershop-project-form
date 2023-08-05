import "../styling/ServicesForm.scss";
import { useEffect, useState } from "react";
import { IForm, IService } from "../interfaces/interfaces";
import ServiceCard from "./ServiceCard";

interface Props {
  form: IForm;
  increaseStep: () => void;
  setFormServices: (services: IService[], increaseStep: boolean) => void;
}

const ServicesForm: React.FC<Props> = ({
  form,
  increaseStep,
  setFormServices,
}) => {
  const [availableServices, setAvailableServices] = useState<IService[]>([]);
  const [hairServices, setHairServices] = useState<IService[]>([]);
  const [beardServices, setBeardServices] = useState<IService[]>([]);
  const [facialServices, setFacialServices] = useState<IService[]>([]);
  const [shaveServices, setShaveServices] = useState<IService[]>([]);
  const [packageServices, setPackageServices] = useState<IService[]>([]);

  function handleChange(e: React.FormEvent<HTMLFormElement>) {
    let checkboxes: NodeList = document.querySelectorAll(".checkbox-round");

    let selected_services: IService[] = [];
    for (let i = 0; i < checkboxes.length; i += 1) {
      let node = checkboxes[i] as HTMLInputElement;

      if (node.checked) {
        let service = availableServices.find(
          (service) => service._id === node.id,
        );
        if (service !== undefined) {
          selected_services.push(service);
        }
      }
    }

    setFormServices(selected_services, false);
  }

  function onSubmitButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    increaseStep();
  }

  useEffect(() => {
    // On mount request services from REST api
    async function getServices() {
      const url = new URL("http:/localhost:3000/services");
      const res = await fetch(url, {
        method: "GET",
      });
      const data = await res.json();
      //console.log(data)
      console.log("Requesting services");
      setAvailableServices(data);
    }

    getServices();
  }, []);

  useEffect(() => {
    // Hook for updating services categories when we finally receive them from REST api
    function getServicesCategories() {
      let hairArray: IService[] = [];
      let beardArray: IService[] = [];
      let facialArray: IService[] = [];
      let shaveArray: IService[] = [];
      let packageArray: IService[] = [];
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
      });
      setHairServices(hairArray);
      setBeardServices(beardArray);
      setFacialServices(facialArray);
      setShaveServices(shaveArray);
      setPackageServices(packageArray);
    }

    getServicesCategories();
  }, [availableServices]);

  return (
    <form className="serviceForm" onSubmit={onSubmitButton}>
      <h1 className="sectionAnnounce">Select services: </h1>
      <h2>Hair</h2>
      <div className="card">
        {hairServices.map((service) => {
          return (
            <ServiceCard
              service={service}
              onChange={handleChange}
              key={service._id}
            />
          );
        })}
      </div>

      <h2>Beard</h2>
      <div className="card">
        {beardServices.map((service) => {
          return (
            <ServiceCard
              service={service}
              onChange={handleChange}
              key={service._id}
            />
          );
        })}
      </div>

      <h2>Facial Treatment</h2>
      <div className="card">
        {facialServices.map((service) => {
          return (
            <ServiceCard
              service={service}
              onChange={handleChange}
              key={service._id}
            />
          );
        })}
      </div>

      <h2>Shave</h2>
      <div className="card">
        {shaveServices.map((service) => {
          return (
            <ServiceCard
              service={service}
              onChange={handleChange}
              key={service._id}
            />
          );
        })}
      </div>

      <h2>Packages & Combos</h2>
      <div className="card">
        {packageServices.map((service) => {
          return (
            <ServiceCard
              service={service}
              onChange={handleChange}
              key={service._id}
            />
          );
        })}
      </div>
      {Number(form.selected_services?.length) > 0 && (
        <footer>
          <button type="submit">Book now</button>
        </footer>
      )}
    </form>
  );
};

export default ServicesForm;
