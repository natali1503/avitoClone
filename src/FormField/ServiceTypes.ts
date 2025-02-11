export const ServiceTypeId = {
  REPAIR: "repair",
  CLEANING: "cleaning",
  DELIVERY: "delivery",
  INSTALLATION: "installation",
  CONSULTING: "consulting",
};

export const ServiceTypes: { id: string; text: string }[] = [
  { id: ServiceTypeId.REPAIR, text: "Ремонт" },
  { id: ServiceTypeId.CLEANING, text: "Уборка" },
  { id: ServiceTypeId.DELIVERY, text: "Доставка" },
  { id: ServiceTypeId.INSTALLATION, text: "Установка" },
  { id: ServiceTypeId.CONSULTING, text: "Консультация" },
];
