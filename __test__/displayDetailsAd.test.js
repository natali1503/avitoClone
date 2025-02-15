import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { DetailsAd } from '../src/components/DetailsAd';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Компонент DetailsAd', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен корректно отображать детальные данные', async () => {
    const mockItems = {
      photo: '',
      data: [
        {
          id: 'name',
          fieldName: 'Название объявления',
          value: '2-комнатная квартира в центре',
        },
        {
          id: 'description',
          fieldName: 'Описание объявления',
          value: 'Светлая квартира с новым ремонтом, рядом с метро. Отличная инфраструктура.',
        },
        {
          id: 'location',
          fieldName: 'Локация объявления',
          value: 'Санкт-Петербург, Россия',
        },

        {
          id: 'type',
          fieldName: 'Тип объявления',
          value: 'Недвижимость',
        },
        {
          id: 'propertyType',
          fieldName: 'Тип недвижимости',
          value: 'Квартира',
        },
        {
          id: 'area',
          fieldName: 'Площадь в квадратных метрах',
          value: '60',
        },
        {
          id: 'rooms',
          fieldName: 'Количество комнат',
          value: '2',
        },
        {
          id: 'price',
          fieldName: 'Цена в рублях',
          value: '12500000',
        },
      ],
    };

    render(
      <MemoryRouter>
        <DetailsAd dataToDisplay={mockItems} id={0} />
      </MemoryRouter>,
    );
    // Проверяем, что информация рендерится
    const detailsContainer = await screen.findByTestId('detailsAd');
    expect(detailsContainer).toBeInTheDocument();
    mockItems.data.forEach((el) => {
      expect(screen.getByText(el.fieldName)).toBeInTheDocument();
      expect(screen.getByText(el.value)).toBeInTheDocument();
    });
  });
});
