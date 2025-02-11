export const RealEstateId = {
  APARTMENT: "apartment",
  HOUSE: "house ",
  COTTAGE: "cottage",
};
export const RealEstate: {
  id: string;
  text: string;
}[] = [
  { id: RealEstateId.APARTMENT, text: "Квартира" },
  { id: RealEstateId.COTTAGE, text: "Коттедж" },
  { id: RealEstateId.HOUSE, text: "Дом" },
];
