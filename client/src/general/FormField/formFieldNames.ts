import { CarBrands } from './Auto';
import { Categories, CategoriesId } from './Categories';
import { RealEstate } from './RealEstate';
import { ServiceTypes } from './ServiceTypes';

export interface IItem {
  id: string;
  text: string;
}

export interface IField {
  id: string;
  fieldName: string;
  typeField: string;
  type: string;
  required: boolean;
  items?: IItem[];
  adornment?: string;
}
export const CommonFields: IField[] = [
  {
    id: 'name',
    fieldName: 'Название объявления',
    typeField: 'input',
    type: 'string',
    required: true,
  },
  {
    id: 'description',
    fieldName: 'Описание объявления',
    typeField: 'input',
    type: 'string',
    required: true,
  },
  {
    id: 'location',
    fieldName: 'Локация объявления',
    typeField: 'input',
    type: 'string',
    required: true,
  },
  {
    id: 'photo',
    fieldName: 'Фото',
    typeField: 'input',
    type: 'file',
    required: false,
  },
  {
    id: 'type',
    fieldName: 'Тип объявления',
    typeField: 'select',
    type: 'string',
    required: true,
    items: Categories,
  },
];

const formFieldRealEstate: IField[] = [
  {
    id: 'propertyType',
    fieldName: 'Тип недвижимости',
    typeField: 'select',
    type: 'string',
    required: true,
    items: RealEstate,
  },
  {
    id: 'area',
    fieldName: 'Площадь в квадратных метрах',
    typeField: 'input',
    type: 'number',
    required: true,
    adornment: 'кв. м',
  },
  {
    id: 'rooms',
    fieldName: 'Количество комнат',
    typeField: 'input',
    type: 'number',
    required: true,
  },
  {
    id: 'price',
    fieldName: 'Цена в рублях',
    typeField: 'input',
    type: 'number',
    required: true,
  },
];
const formFieldAuto: IField[] = [
  {
    id: 'brand',
    fieldName: 'Марка автомобиля',
    typeField: 'select',
    type: 'string',
    required: true,
    items: CarBrands,
  },
  {
    id: 'model',
    fieldName: 'Модель автомобиля',
    typeField: 'input',
    type: 'string',
    required: true,
  },
  {
    id: 'year',
    fieldName: 'Год выпуска',
    typeField: 'input',
    type: 'number',
    required: true,
  },
  {
    id: 'mileage',
    fieldName: 'Пробег в километрах',
    typeField: 'input',
    type: 'number',
    required: false,
    adornment: 'км',
  },
];

const formFieldServices: IField[] = [
  {
    id: 'serviceType',
    fieldName: 'Тип услуги',
    typeField: 'select',
    type: 'string',
    required: true,
    items: ServiceTypes,
  },
  {
    id: 'experience',
    fieldName: 'Опыт работы в годах',
    typeField: 'input',
    type: 'number',
    required: true,
    adornment: 'лет',
  },
  {
    id: 'cost',
    fieldName: 'Стоимость услуги в рублях',
    typeField: 'input',
    type: 'number',
    required: true,
  },
  {
    id: 'workSchedule',
    fieldName: 'График работы',
    typeField: 'input',
    type: 'string',
    required: false,
  },
];

export const FieldsByType = {
  [CategoriesId.REAL_ESTATE]: formFieldRealEstate,
  [CategoriesId.AUTO]: formFieldAuto,
  [CategoriesId.SERVICES]: formFieldServices,
};
