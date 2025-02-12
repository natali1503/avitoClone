import { IItem } from "./formFieldNames";

export const AutoId = {
  TOYOTA: "toyota",
  BMW: "bmw",
  MERCEDES: "mercedes",
  AUDI: "audi",
  FORD: "ford",
};

export const CarBrands: IItem[] = [
  { id: AutoId.TOYOTA, text: "Toyota" },
  { id: AutoId.BMW, text: "BMW" },
  { id: AutoId.MERCEDES, text: "Mercedes-Benz" },
  { id: AutoId.AUDI, text: "Audi" },
  { id: AutoId.FORD, text: "Ford" },
];
