import { render, screen } from '@testing-library/react';
import { ListItems } from '../src/components/ListAnnouncement/ListItems';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Компонент ListItems', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен корректно отображать список объявлений', async () => {
    const mockItems = [
      {
        id: 0,
        name: '2-комнатная квартира в центре',
        description: 'Светлая квартира с новым ремонтом, рядом с метро. Отличная инфраструктура.',
        location: 'Санкт-Петербург, Россия',
        type: 'Недвижимость',
        photo: '',
        propertyType: 'Квартира',
        area: '60',
        rooms: '2',
        price: '12500000',
      },
    ];

    render(
      <MemoryRouter>
        <ListItems dataToDisplay={mockItems} notFoundData={false} />
      </MemoryRouter>,
    );

    // Проверяем, что список рендерится
    const listItemsContainer = await screen.findByTestId('listItems');
    expect(listItemsContainer).toBeInTheDocument();

    // Проверяем, что отображаются основные данные объявления
    expect(screen.getByText(mockItems[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockItems[0].location)).toBeInTheDocument();
    expect(screen.getByText(mockItems[0].type)).toBeInTheDocument();
  });

  it('Должен отображать сообщение "Объявлений по выбранным параметрам нет", если notFoundData=true', () => {
    render(
      <MemoryRouter>
        <ListItems dataToDisplay={[]} notFoundData={true} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Объявлений по выбранным параметрам нет/i)).toBeInTheDocument();
  });

  it('Должен отображать сообщение "Пока объявлений нет", если dataToDisplay=null', () => {
    render(
      <MemoryRouter>
        <ListItems dataToDisplay={null} notFoundData={true} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Пока объявлений нет/i)).toBeInTheDocument();
  });
});
