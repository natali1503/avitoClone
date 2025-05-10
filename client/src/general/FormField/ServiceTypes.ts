import { IItem } from './formFieldNames';

export const ServiceTypeId = {
  REPAIR: 'repair',
  CLEANING: 'cleaning',
  DELIVERY: 'delivery',
  INSTALLATION: 'installation',
  CONSULTING: 'consulting',
  ELECTRICIAN: 'electrician',
};

export const ServiceTypes: IItem[] = [
  { id: ServiceTypeId.REPAIR, text: 'Ремонт' },
  { id: ServiceTypeId.CLEANING, text: 'Уборка' },
  { id: ServiceTypeId.DELIVERY, text: 'Доставка' },
  { id: ServiceTypeId.INSTALLATION, text: 'Установка' },
  { id: ServiceTypeId.CONSULTING, text: 'Консультация' },
  { id: ServiceTypeId.CONSULTING, text: 'Электрик' },
];
