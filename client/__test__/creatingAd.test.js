import { within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Categories, CategoriesId } from '../src/general/FormField/Categories';
import App from '../src/App';

import { screen, render } from './test-utils';
import { ListAnnouncement } from './pageObjects/ListAnnouncement';
import { FormAnnouncement } from './pageObjects/FormAnnouncement';
import { FormCreateAd } from '../src/pages/formAd/ui/FormCreateAd';
import { RealEstate, RealEstateId } from '../src/general/FormField/RealEstate';
import { AutoId, CarBrands } from '../src/general/FormField/Auto';
import { ServiceTypeId, ServiceTypes } from '../src/general/FormField/ServiceTypes';
import { initValueForm } from '../src/general/FormField/InitValueForm';
import { getIdByText } from '../src/utils/getIdByText';

jest.mock('../src/api/api-actions', () => ({
  ...jest.requireActual('../src/api/api-actions'),
  createAd: jest.fn(),
}));

// Wrapper компонент для тестирования FormCreateAd с управлением состоянием
const TestFormWrapper = ({ formSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
      location: '',
      photo: '',
      type: '',
      // RealEstate fields
      propertyType: '',
      area: '',
      rooms: '',
      price: '',
      // Auto fields
      brand: '',
      model: '',
      year: '',
      mileage: '',
      // Services fields
      serviceType: '',
      experience: '',
      cost: '',
      workSchedule: '',
    },
    mode: 'onTouched',
  });

  const type = getIdByText(Categories, useWatch({ control, name: 'type' }));

  const handleClickNextStep = async () => {
    setCurrentStep(2);
  };

  const handleStepForm = (step) => {
    setCurrentStep(step);
  };

  const formManagement = {
    control,
    type,
    errors,
    handleSubmit,
  };

  return (
    <FormCreateAd
      formSubmit={formSubmit}
      isLoading={false}
      currentStep={currentStep}
      formManagement={formManagement}
      handleClickNextStep={handleClickNextStep}
      handleStepForm={handleStepForm}
    />
  );
};

describe('Создание объявления', () => {
  beforeEach(() => {
    global.AbortController = class {
      signal = {
        aborted: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      abort = jest.fn(() => {
        this.signal.aborted = true;
      });
    };
  });
  afterEach(() => {});
  it('Наличие кнопки создания объявления', async () => {
    render(<App />, {});
    await ListAnnouncement.getCreatingAdButton();
  });
  it('Открытие формы размещения', async () => {
    render(<App />, {});
    const button = await ListAnnouncement.getCreatingAdButton();
    await userEvent.click(button);
    expect(screen.getByText('Форма размещения')).toBeInTheDocument();
  });
  it('Создание объявления по недвижимости', async () => {
    const onSubmit = jest.fn();
    render(<TestFormWrapper formSubmit={onSubmit} />);

    //Заполняем первый этап формы
    const nameInput = await FormAnnouncement.getName();
    const descriptionInput = await FormAnnouncement.getDescription();
    const locationInput = await FormAnnouncement.getLocation();
    const typeInput = await FormAnnouncement.getType();

    const typeValue = Categories.filter((el) => el.id === CategoriesId.REAL_ESTATE)[0].text;

    await userEvent.type(nameInput, 'Продам квартиру');
    await userEvent.type(descriptionInput, 'Двухкомнатная квартира');
    await userEvent.type(locationInput, 'Екатеринбург');
    await userEvent.click(typeInput);
    await userEvent.selectOptions(screen.getByRole('listbox'), typeValue);

    const nextStepButton = await FormAnnouncement.getNextStepButton();
    await userEvent.click(nextStepButton);

    //Заполняем второй этап формы
    const propertyTypeInput = await FormAnnouncement.getPropertyType();
    const areaInput = await FormAnnouncement.getArea();
    const roomsInput = await FormAnnouncement.getRooms();
    const priceInput = await FormAnnouncement.getPrice();

    const propertyTypeInputValue = RealEstate.filter((el) => el.id === RealEstateId.APARTMENT)[0].text;

    await userEvent.click(propertyTypeInput);
    await userEvent.selectOptions(screen.getByRole('listbox'), propertyTypeInputValue);
    await userEvent.type(areaInput, '55');
    await userEvent.type(roomsInput, '2');
    await userEvent.type(priceInput, '4500000');

    //Отправка формы
    const submitButton = await FormAnnouncement.getSubmitButton();
    await userEvent.click(submitButton);

    expect(onSubmit.mock.calls).toHaveLength(1);
  });
  it('Создание объявления по авто', async () => {
    const onSubmit = jest.fn();
    render(<TestFormWrapper formSubmit={onSubmit} />);

    //Заполняем первый этап формы
    const nameInput = await FormAnnouncement.getName();
    const descriptionInput = await FormAnnouncement.getDescription();
    const locationInput = await FormAnnouncement.getLocation();
    const typeInput = await FormAnnouncement.getType();

    const typeValue = Categories.filter((el) => el.id === CategoriesId.AUTO)[0].text;

    await userEvent.type(nameInput, 'Продам машину');
    await userEvent.type(descriptionInput, 'Машина новая');
    await userEvent.type(locationInput, 'Екатеринбург');
    await userEvent.click(typeInput);
    await userEvent.selectOptions(screen.getByRole('listbox'), typeValue);

    const nextStepButton = await FormAnnouncement.getNextStepButton();
    await userEvent.click(nextStepButton);

    //Заполняем второй этап формы
    const brand = await FormAnnouncement.getBrand();
    const model = await FormAnnouncement.getModel();
    const year = await FormAnnouncement.getYear();
    const mileage = await FormAnnouncement.getMileage();

    const brandValue = CarBrands.find((el) => el.id === AutoId.AUDI).text;
    await userEvent.click(brand);
    await userEvent.selectOptions(screen.getByRole('listbox'), brandValue);
    await userEvent.type(model, 'Corolla');
    await userEvent.type(year, '2020');
    await userEvent.type(mileage, '150');

    //Отправка формы
    const submitButton = await FormAnnouncement.getSubmitButton();
    await userEvent.click(submitButton);

    expect(onSubmit.mock.calls).toHaveLength(1);
  });
  it('Создание объявления по услугам', async () => {
    const onSubmit = jest.fn();
    render(<TestFormWrapper formSubmit={onSubmit} />);

    //Заполняем первый этап формы
    const nameInput = await FormAnnouncement.getName();
    const descriptionInput = await FormAnnouncement.getDescription();
    const locationInput = await FormAnnouncement.getLocation();
    const typeInput = await FormAnnouncement.getType();

    const typeValue = Categories.filter((el) => el.id === CategoriesId.SERVICES)[0].text;

    await userEvent.type(nameInput, 'Электрик');
    await userEvent.type(descriptionInput, 'Электрик 3 группы');
    await userEvent.type(locationInput, 'Екатеринбург');
    await userEvent.click(typeInput);
    await userEvent.selectOptions(screen.getByRole('listbox'), typeValue);

    const nextStepButton = await FormAnnouncement.getNextStepButton();
    await userEvent.click(nextStepButton);

    //Заполняем второй этап формы
    const serviceType = await FormAnnouncement.getServiceType();
    const experience = await FormAnnouncement.getExperience();
    const cost = await FormAnnouncement.getCost();
    const workSchedule = await FormAnnouncement.getWorkSchedule();

    const serviceTypeValue = ServiceTypes.find((el) => el.id === ServiceTypeId.ELECTRICIAN).text;

    await userEvent.click(serviceType);
    await userEvent.selectOptions(screen.getByRole('listbox'), serviceTypeValue);
    await userEvent.type(experience, '10');
    await userEvent.type(cost, '2500');
    await userEvent.type(workSchedule, 'Пн–Сб с 9:00 до 18:00');

    //Отправка формы
    const submitButton = await FormAnnouncement.getSubmitButton();
    await userEvent.click(submitButton);

    expect(onSubmit.mock.calls).toHaveLength(1);
  });
  it('Возвращение на 1 шаг формы со 2 шага', async () => {
    const onSubmit = jest.fn();
    render(<TestFormWrapper formSubmit={onSubmit} />);

    //Заполняем первый этап формы
    const nameInput = await FormAnnouncement.getName();
    const descriptionInput = await FormAnnouncement.getDescription();
    const locationInput = await FormAnnouncement.getLocation();
    const typeInput = await FormAnnouncement.getType();

    const typeValue = Categories.filter((el) => el.id === CategoriesId.REAL_ESTATE)[0].text;

    await userEvent.type(nameInput, 'Продам квартиру');
    await userEvent.type(descriptionInput, 'Двухкомнатная квартира');
    await userEvent.type(locationInput, 'Екатеринбург');
    await userEvent.click(typeInput);
    await userEvent.selectOptions(screen.getByRole('listbox'), typeValue);

    const nextStepButton = await FormAnnouncement.getNextStepButton();
    await userEvent.click(nextStepButton);
    const backStepButton = await FormAnnouncement.getBackStepButton();
    await userEvent.click(backStepButton);
    expect(screen.getByText('Шаг 1')).toBeInTheDocument();
  });
});
