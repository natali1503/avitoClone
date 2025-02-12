interface IAd {
  id: number;
  name: string;
  description: string;
  location: string;
  photo: File[] | '';
  type: string;
}
interface IAdRealEstat extends IAd {
  propertyType: string;
  area: string;
  rooms: string;
  price: string;
}
interface IAdAuto extends IAd {
  brand: string;
  model: string;
  year: string;
  mileage: string;
}
interface IAdServices extends IAd {
  serviceType: string;
  experience: string;
  cost: string;
  workSchedule: string;
}
export type TypeFormData = IAdRealEstat | IAdAuto | IAdServices;
