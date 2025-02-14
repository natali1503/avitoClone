import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FC, useState } from 'react';
import { Box } from '@mui/material';

import {
  CommonFields,
  FieldsByType,
} from '../general/FormField/formFieldNames';
import { Categories, CategoriesValues } from '../general/FormField/Categories';
import {
  updatedDataToDisplay,
  IAdToDisplay,
  IDataToDisplay,
} from '../store/adInfoSlice';
import { IAd, TypeFormData } from '../general/TypeFormData';
import { getIdByText } from '../utils/getIdByText';
import { getIdFields } from '../utils/getIdFields';
import { AppDispatch } from '../store';

import { CustomButton } from './CustomButton';
import { Title } from './Title';
import { Form } from './Form';

interface IFormEditAd {
  onSubmit: SubmitHandler<TypeFormData>;
  dataForEditing: IDataToDisplay;
}

export const FormEditAd: FC<IFormEditAd> = ({ onSubmit, dataForEditing }) => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeFormData>({ mode: 'onTouched' });

  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const type =
    getIdByText(Categories, useWatch({ control, name: 'type' })) ||
    Categories.filter(
      (el) =>
        el.text ===
        dataForEditing?.data?.filter((el) => el?.id === 'type')[0]?.value,
    )[0]?.id;

  const handleClick = (step: number) => setCurrentStep(step);

  const handleClickNextStep = async () => {
    const isValid = await trigger(
      CommonFields.map((field) => field.id) as (keyof IAd)[],
    );
    if (isValid) {
      const currentTypeValue = dataForEditing.data.filter(
        (el) => el.id === 'type',
      )[0].value as string;
      const currentTypeId = getIdByText(
        Categories,
        currentTypeValue,
      ) as CategoriesValues;
      //тип объявления не меняется
      if (currentTypeId === type) {
        handleClick(2);
      }
      //тип объявления меняется
      else {
        const idForRemove = getIdFields(currentTypeId);
        const idForAdd = getIdFields(type as CategoriesValues);
        let updatedDataForEditing: IAdToDisplay[] = [];
        updatedDataForEditing = dataForEditing.data.filter(
          (el) => !idForRemove.includes(el.id),
        );
        //удаление дополнительных полей по старому типу
        idForAdd.forEach((id) => {
          const additionalFieldsByType = FieldsByType[type as CategoriesValues];
          const field = additionalFieldsByType.filter((el) => el.id === id)[0];
          //добавление дополнительных полей по новому типу
          updatedDataForEditing.push({
            id,
            fieldName: field.fieldName,
            value: '',
          });
        });

        dispatch(updatedDataToDisplay(updatedDataForEditing));
        handleClick(2);
      }
    }
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'3rem'}
    >
      <Title title={'Форма размещения'} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'1rem'}
          width={'100%'}
        >
          {currentStep === 1 && (
            <Form
              fields={CommonFields}
              formTitle={'Шаг 1'}
              control={control}
              errors={errors}
              dataForEditing={dataForEditing?.data}
            />
          )}

          {currentStep === 2 && (
            <Form
              fields={FieldsByType[type as CategoriesValues]}
              formTitle={'Шаг 2'}
              control={control}
              errors={errors}
              dataForEditing={dataForEditing?.data}
            />
          )}

          {currentStep === 1 && (
            <CustomButton
              text='Далее'
              type='button'
              onClick={handleClickNextStep}
            />
          )}

          {!!type && currentStep === 2 && (
            <Box display={'flex'} flexDirection={'row'} gap={'1rem'}>
              <CustomButton
                text='Назад'
                type='button'
                onClick={() => handleClick(1)}
                disabled={currentStep === 2}
              />
              <CustomButton text='Отправить' type='submit' disabled={!!true} />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};
