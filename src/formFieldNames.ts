export const CategoriesId = {
  REAL_ESTATE: "realEstate",
  AUTO: "auto",
  SERVICES: "services",
};

export interface ICategories {
  id: string;
  text: string;
}
export const Categories: ICategories[] = [
  { id: CategoriesId.REAL_ESTATE, text: "Недвижимость" },
  { id: CategoriesId.AUTO, text: "Авто" },
  { id: CategoriesId.SERVICES, text: "Услуги" },
];

export interface IField {
  id: string;
  text: string;
  typeField: string;
  type: string;
  required: boolean;
  items?: typeof Categories;
  adornment?: string;
}
export const CommonFields: IField[] = [
  { id: "name", text: "Название объявления", typeField: "input", type: "string", required: true },
  { id: "description", text: "Описание объявления", typeField: "input", type: "string", required: true },
  { id: "location", text: "Локация объявления", typeField: "input", type: "string", required: true },
  { id: "photo", text: "Фото", typeField: "input", type: "string", required: false },
  { id: "type", text: "Тип объявления", typeField: "select", type: "string", required: true, items: Categories },
];

const formFieldRealEstate: IField[] = [
  { id: "propertyType", text: "Тип недвижимости", typeField: "input", type: "string", required: true },
  {
    id: "area",
    text: "Площадь в квадратных метрах",
    typeField: "input",
    type: "number",
    required: true,
    adornment: "кв. м",
  },
  { id: "rooms", text: "Количество комнат", typeField: "input", type: "number", required: true },
  { id: "price", text: "Цена в рублях", typeField: "input", type: "number", required: true },
];
const formFieldAuto: IField[] = [
  { id: "brand", text: "Марка автомобиля", typeField: "input", type: "string", required: true },
  { id: "model", text: "Модель автомобиля", typeField: "input", type: "string", required: true },
  { id: "year", text: "Год выпуска", typeField: "input", type: "number", required: true },
  { id: "mileage", text: "Пробег в километрах", typeField: "input", type: "number", required: false, adornment: "км" },
];

const formFieldServices: IField[] = [
  { id: "serviceType", text: "Тип услуги", typeField: "input", type: "string", required: true },
  {
    id: "experience",
    text: "Опыт работы в годах",
    typeField: "input",
    type: "number",
    required: true,
    adornment: "лет",
  },
  { id: "cost", text: "Стоимость услуги в рублях", typeField: "input", type: "number", required: true },
  { id: "workSchedule", text: "График работы", typeField: "input", type: "string", required: false },
];

export const FieldsByType = {
  [CategoriesId.REAL_ESTATE]: formFieldRealEstate,
  [CategoriesId.AUTO]: formFieldAuto,
  [CategoriesId.SERVICES]: formFieldServices,
};
