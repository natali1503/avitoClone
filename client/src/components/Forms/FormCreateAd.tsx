import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { IAd, TypeFormData } from '../../general/TypeFormData';
import { CommonFields, FieldsByType } from '../../general/FormField/formFieldNames';
import { Categories, CategoriesValues } from '../../general/FormField/Categories';
import { getIdByText } from '../../utils/getIdByText';
import { useDraft } from '../../hooks/useDraft';
import { CustomButton } from '../CustomButton';
import { Title } from '../Title';

import { Form } from './Form';

interface IFormCreateAd {
  formSubmit: SubmitHandler<TypeFormData>;
}

export const FormCreateAd: FC<IFormCreateAd> = ({ formSubmit }) => {
  const { draft, setDraft, clearDraft } = useDraft();
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TypeFormData>({ defaultValues: draft || {}, mode: 'onTouched' });
  const [currentStep, setCurrentStep] = useState(1);

  const type = getIdByText(Categories, useWatch({ control, name: 'type' }));
  const handleClick = (step: number) => setCurrentStep(step);
  const handleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id) as (keyof IAd)[]);
    if (isValid) handleClick(2);
  };

  //Сохранение данных в localStorage при изменении формы
  useEffect(() => {
    const subscription = watch((values) => {
      setDraft(values as TypeFormData);
    });

    return () => subscription.unsubscribe();
  }, [watch, setDraft]);

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'3rem'}>
      <Title title={'Форма размещения'} />
      <form
        onSubmit={handleSubmit((data) => {
          clearDraft(); // Очистка черновика после отправки
          formSubmit(data);
        })}
        style={{ width: '100%' }}
      >
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
              dataTestId={'createAdStep1'}
            />
          )}

          {currentStep === 2 && (
            <Form
              fields={FieldsByType[type as CategoriesValues]}
              formTitle={'Шаг 2'}
              control={control}
              errors={errors}
              dataTestId={'createAdStep2'}
            />
          )}

          {currentStep === 1 && (
            <CustomButton text='Далее' type='button' onClick={handleClickNextStep} dataTestId='nextStep' />
          )}

          {!!type && currentStep === 2 && (
            <Box display={'flex'} flexDirection={'row'} gap={'1rem'}>
              <CustomButton text='Назад' type='button' onClick={() => handleClick(1)} disabled={currentStep === 2} />
              <CustomButton text='Отправить' type='submit' disabled={!!true} dataTestId='createAd' />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};
