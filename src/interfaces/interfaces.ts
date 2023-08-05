interface IService {
  _id: string;
  name: string;
  price: number;
  time: number;
  category: string;
  description: string;
}

interface IBarber {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: number;
}

interface ICustomer {
  _id: number | undefined;
  first_name: string;
  last_name: string;
  phone_number: number;
}

interface ILocation {
  _id: string;
  location: string;
  map_index: number;
  name: string;
}

interface IForm {
  selected_location?: ILocation;
  selected_services?: IService[];
  selected_barber?: IBarber;
  selected_day?: number;
  selected_month?: number;
  selected_year?: number;
  selected_timeslot?: number;
  customer?: ICustomer;
}

export type { IService, IBarber, ICustomer, ILocation, IForm };
