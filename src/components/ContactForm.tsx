import "../styling/ContactForm.scss";
import { ICustomer } from "../interfaces/interfaces";

interface Props {
  setFormCustomer: (customer: ICustomer) => void;
}

const ContactForm: React.FC<Props> = ({ setFormCustomer }) => {
  /* function onSubmitButton(event: React.FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        const target = event.target as typeof event.target & {
            location: { value: string };
        };
        //console.log(target.location.value);
        barbershops.forEach(barbershop => {
          if (barbershop._id === target.location.value) {
            setFormLocation(barbershop);
          }
        })
      }; */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      lastname: { value: string };
      phoneNumber: { value: number };
    };
    let customer: ICustomer = {
      _id: undefined,
      first_name: target.name.value,
      last_name: target.lastname.value,
      phone_number: Number(target.phoneNumber.value),
    };

    setFormCustomer(customer);
  }
  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <h1 className="sectionAnnounce">Write contact information: </h1>
      <h2>Final step before placing an appointment</h2>
      <fieldset>
        <legend>Full name</legend>
        <input placeholder="Name" name="name"></input>
        <input placeholder="Last name" name="lastname"></input>
      </fieldset>
      <fieldset>
        <legend>Phone number</legend>
        <input
          type="number"
          placeholder="306934812233"
          name="phoneNumber"
        ></input>
      </fieldset>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default ContactForm;
