import { IItem } from './formFieldNames';

export const CategoriesId = {
  REAL_ESTATE: 'realEstate',
  AUTO: 'auto',
  SERVICES: 'services',
} as const;
export type CategoriesValues = (typeof CategoriesId)[keyof typeof CategoriesId];

export const Categories: IItem[] = [
  { id: CategoriesId.REAL_ESTATE, text: 'Недвижимость' },
  { id: CategoriesId.AUTO, text: 'Авто' },
  { id: CategoriesId.SERVICES, text: 'Услуги' },
];
