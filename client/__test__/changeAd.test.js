import { api } from '../src/api';
import { createAd, getAnnouncements } from '../src/api/api-actions';
import { APIRoute } from '../src/api/APIRoute';
import { adaptAdDataToType } from '../src/utils/adaptAdDataToType';
import { Categories, CategoriesId } from '../src/general/FormField/Categories';

describe('Изменение объявления', () => {
  beforeEach(() => {});

  test('Проверка адаптации данных объявления при смене тепа', () => {
    const newTypeAdId = Categories.filter((item) => item.id === CategoriesId.SERVICES)[0].id;
    const newTypeText = Categories.filter((item) => item.id === newTypeAdId)[0].text;
    const mockData = {
      name: 'Продаётся квартира в центре',
      description: 'Светлая 2-комнатная квартира рядом с метро.',
      location: 'Москва, Арбат',
      photo: '',
      type: newTypeText,
      propertyType: 'Квартира',
      area: '54',
      rooms: '2',
      price: '8500000',
    };
    const dataAfterChangingType = adaptAdDataToType(mockData, newTypeAdId);

    expect(dataAfterChangingType).toEqual({
      name: mockData.name,
      description: mockData.description,
      location: mockData.location,
      photo: mockData.photo,
      type: newTypeText,
      serviceType: '',
      experience: '',
      cost: '',
      workSchedule: '',
    });
  });
});
