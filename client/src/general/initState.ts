import { TAdResponse } from '../entities/ad/types';

const exampleRealEstateAd = {
  name: 'Продаётся квартира в центре',
  description: 'Светлая 2-комнатная квартира рядом с метро.',
  location: 'Москва, Арбат',
  photo: '',
  type: 'Недвижимость',
  propertyType: 'Квартира',
  area: '54',
  rooms: '2',
  price: '8500000',
  id: 1,
} as TAdResponse;

const exampleAutoAd = {
  name: 'Продаю Toyota Camry',
  description: 'Надёжный автомобиль в отличном состоянии.',
  location: 'Санкт-Петербург',
  photo: '',
  type: 'Авто',
  brand: 'Toyota',
  model: 'Camry',
  year: '2018',
  mileage: '65000',
  id: 2,
} as TAdResponse;

const exampleServiceAd = {
  name: 'Услуги электрика',
  description: 'Профессиональный электрик с 10-летним опытом.',
  location: 'Казань',
  photo: '',
  type: 'Услуги',
  serviceType: 'Электрик',
  experience: '10',
  cost: '1500',
  workSchedule: 'Пн–Сб с 9:00 до 18:00',
  id: 3,
} as TAdResponse;

export const initState = [exampleRealEstateAd, exampleAutoAd, exampleServiceAd];
