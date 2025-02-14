import React from 'react';
import { waitFor, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../src/App';
import { store, screen, render } from './test-utils';
import {
  CommonFields,
  FieldsByType,
} from '../src/general/FormField/formFieldNames';

import { Categories, CategoriesId } from '../src/general/FormField/Categories';
import { createAd } from '../src/api-actions';

jest.mock('../src/api-actions', () => ({
  ...jest.requireActual('../src/api-actions'),
  createAd: jest.fn(),
}));

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
    await screen.findByTestId('creatingAd');
  });
  it('Создание объявления по недвижимости', async () => {
    render(<App />, {});
    const creatingAdBtn = await screen.findByTestId('creatingAd');
    await userEvent.click(creatingAdBtn);
    await screen.findByTestId('createAdStep1');
    //Заполнение общих полей
    for (const commonField of CommonFields) {
      if (commonField.required && commonField.typeField === 'input') {
        await userEvent.type(
          screen.getByTestId(commonField.id),
          'Тестовое объявление',
        );
      } else if (commonField.required && commonField.typeField === 'select') {
        const typeValue = Categories.filter(
          (el) => el.id === CategoriesId.REAL_ESTATE,
        )[0].text;

        const typeField = await screen.findByTestId(commonField.id);
        const typeSelect = within(typeField).getByRole('combobox');
        await userEvent.click(typeSelect);
        userEvent.selectOptions(screen.getByRole('listbox'), typeValue);
      }
    }
    //Переход на второй шаг формы
    await userEvent.click(screen.getByTestId('nextStep'));
    await screen.findByTestId('createAdStep2');
    //Заполнение дополнительных полей
    for (const additionalField of FieldsByType[CategoriesId.REAL_ESTATE]) {
      if (additionalField.required && additionalField.typeField === 'input') {
        if (additionalField.type === 'string') {
          await userEvent.type(
            screen.getByTestId(additionalField.id),
            'Тестовое объявление',
          );
        }
        if (additionalField.type === 'number') {
          await userEvent.type(screen.getByTestId(additionalField.id), '1000');
        }
      } else if (
        additionalField.required &&
        additionalField.typeField === 'select'
      ) {
        const selectValue = additionalField.items[0].text;
        const additionaSelectField = await screen.findByTestId(
          additionalField.id,
        );
        const additionaSelect =
          within(additionaSelectField).getByRole('combobox');
        await userEvent.click(additionaSelect);
        userEvent.selectOptions(screen.getByRole('listbox'), selectValue);
      }
    }

    await userEvent.click(screen.getByTestId('createAd'));
    expect(createAd).toHaveBeenCalledTimes(1);
  });
});
