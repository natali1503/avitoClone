import { IItem } from "./formFieldNames";

export const CategoriesId = {
  REAL_ESTATE: "realEstate",
  AUTO: "auto",
  SERVICES: "services",
};

export const Categories: IItem[] = [
  { id: CategoriesId.REAL_ESTATE, text: "Недвижимость" },
  { id: CategoriesId.AUTO, text: "Авто" },
  { id: CategoriesId.SERVICES, text: "Услуги" },
];
