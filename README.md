# Appointment form
HTML/SCSS/TS/React This is a page for making appointments. Users will be navigated through 5 steps of making appointment.

1. Choosing location
2. Selecting services
3. Selecting prefered barber
4. Choosing timeslot
5. Sign up to create appointment

## Problems and their solutions:
### Typescript:
#### Changing state of a form
Typescript was not able to copy form, change one property of the form and then setState.
```ts
interface Form {
  selected_location: string;
  selected_services: Service[];
  selected_barber: Barber;
  selected_date: Date;
}

const setFormLocation = (location: string) => {
  let copyForm: Form = {...form}
  copyForm.selected_location = location;
  setForm(copyForm);
}
```
Error: Property selected_location is optional in copyForm but required in Form

Solution: Making those properties optional in interface
```ts
interface Form {
  selected_location?: string;
  selected_services?: Service[];
  selected_barber?: Barber;
  selected_date?: Date;
}
```
#### Checking if checkbox is checked
checkboxes.forEach approach did not work at all, so i was forced to treat NodeList as usual array and use typecasting on individual elements of an array. 

Otherwise typescript was not sure that Node/Element does have property .checked
```ts
let checkboxes: NodeList = document.querySelectorAll('.checkbox');

for (let i = 0; i < checkboxes.length; i += 1) {
    let node = checkboxes[i] as HTMLInputElement;
    console.log(node.checked)
}
```
