import { IItem } from './formFieldNames';

export const RealEstateId = {
  APARTMENT: 'apartment',
  HOUSE: 'house ',
  COTTAGE: 'cottage',
};
export const RealEstate: IItem[] = [
  { id: RealEstateId.APARTMENT, text: 'Квартира' },
  { id: RealEstateId.COTTAGE, text: 'Коттедж' },
  { id: RealEstateId.HOUSE, text: 'Дом' },
];
