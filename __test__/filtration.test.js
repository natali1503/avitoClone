import { renderHook, act } from '@testing-library/react';

import { useFilters } from '../src/hooks/useFilters';

const mockAds = [
  // Недвижимость
  {
    id: 1,
    name: 'Квартира в центре',
    description: 'Просторная 2-комнатная квартира рядом с метро.',
    location: 'Москва, Россия',
    photo: '',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: '60',
    rooms: '2',
    price: '12500000',
  },
  {
    id: 2,
    name: 'Загородный дом',
    description: 'Дом с участком 10 соток, отличный вариант для отдыха.',
    location: 'Санкт-Петербург, Россия',
    photo: '',
    type: 'Недвижимость',
    propertyType: 'Дом',
    area: '120',
    rooms: '4',
    price: '25000000',
  },

  // Авто
  {
    id: 3,
    name: 'Toyota Camry 2021',
    description: 'Один владелец, обслуживался у дилера, отличное состояние.',
    location: 'Москва, Россия',
    photo: '',
    type: 'Авто',
    brand: 'Toyota',
    model: 'Camry',
    year: '2021',
    mileage: '45000',
  },
  {
    id: 4,
    name: 'BMW X5 2019',
    description: 'Полный привод, кожаный салон, все опции.',
    location: 'Казань, Россия',
    photo: '',
    type: 'Авто',
    brand: 'BMW',
    model: 'X5',
    year: '2019',
    mileage: '70000',
  },

  // Услуги
  {
    id: 5,
    name: 'Ремонт квартир',
    description: 'Полный спектр услуг по ремонту, дизайн-проект в подарок.',
    location: 'Москва, Россия',
    photo: '',
    type: 'Услуги',
    serviceType: 'Ремонт',
    experience: '10',
    cost: '5000',
    workSchedule: 'Пн-Пт 09:00-18:00',
  },
  {
    id: 6,
    name: 'Репетитор по английскому',
    description: 'Обучение с нуля, подготовка к IELTS и TOEFL.',
    location: 'Санкт-Петербург, Россия',
    photo: '',
    type: 'Услуги',
    serviceType: 'Обучение',
    experience: '5',
    cost: '1500',
    workSchedule: 'Пн-Вс 10:00-20:00',
  },
];

describe('Тестирование фильтрации', () => {
  let result = null;
  beforeEach(() => {
    result = renderHook(() => useFilters({ adList: mockAds })).result;
  });
  afterEach(() => {
    act(() => {
      result.current.resetFilters();
    });
  });
  it('Инициализируется с пустыми значениями', () => {
    expect(result.current.searchName).toBe('');
    expect(result.current.categories).toBe('');
    expect(result.current.filteredData).toEqual(mockAds);
    expect(result.current.notFoundData).toBe(false);
  });
  it('Фильтр категории объявлений Авто', () => {
    act(() => {
      result.current.setCategories('auto');
    });
    expect(result.current.categories).toBe('auto');
    expect(result.current.filteredData.length).toBe(2);
  });
  it('Фильтр по названию Ремонт квартир', () => {
    act(() => {
      result.current.setSearchName('Ремонт квартир');
    });
    expect(result.current.searchName).toBe('Ремонт квартир');
    expect(result.current.filteredData.length).toBe(1);
  });
  it('Фильтр по названию Ремонт квартир и категории Авто', () => {
    act(() => {
      result.current.setCategories('auto');
      result.current.setSearchName('Ремонт квартир');
    });
    expect(result.current.categories).toBe('auto');
    expect(result.current.searchName).toBe('Ремонт квартир');
    expect(result.current.filteredData.length).toBe(0);
    expect(result.current.notFoundData).toBe(true);
  });
  it('Сброс фильтров', () => {
    act(() => {
      result.current.setCategories('auto');
      result.current.setSearchName('Ремонт квартир');
    });
    expect(result.current.notFoundData).toBe(true);
    act(() => {
      result.current.resetFilters();
    });
    expect(result.current.searchName).toBe('');
    expect(result.current.categories).toBe('');
    expect(result.current.filteredData).toEqual(mockAds);
    expect(result.current.notFoundData).toBe(false);
  });
});
