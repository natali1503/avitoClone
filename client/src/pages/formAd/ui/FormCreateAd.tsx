import { SubmitHandler } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC } from 'react';
import { Box } from '@mui/material';

import { TypeFormData } from '../../../general/TypeFormData';
import { CategoriesValues } from '../../../general/FormField/Categories';
import { CommonFields, FieldsByType } from '../../../general/FormField/formFieldNames';
import { Wrapper } from '../../../components/tempName/Wrapper';
import { Header } from '../../../components/tempName/Header';
import { CustomButton } from '../../../components/tempName/CustomButton';
import { TUseCreateAdReturn } from '../hooks/useCreateAd';

import { Form } from './Form';
import { TFormManagement } from '../hooks/types';

interface IFormCreateAd {
  formSubmit: SubmitHandler<TypeFormData>;
  isLoading: boolean;
  currentStep: any;
  formManagement: TFormManagement;

  handleClickNextStep: TUseCreateAdReturn['handleClickNextStep'];
  handleStepForm: TUseCreateAdReturn['handleStepForm'];
}

export const FormCreateAd: FC<IFormCreateAd> = ({
  formSubmit,
  isLoading,
  formManagement,
  currentStep,
  handleClickNextStep,
  handleStepForm,
}) => {
  const { handleSubmit, control, errors, type } = formManagement;

  return (
    <Wrapper>
      <Header header='Форма размещения' />
      <Box display='flex' flexDirection='column' flexGrow={1} bgcolor={'rgba(245, 246, 245,0.4)'}>
        <form
          onSubmit={handleSubmit((data) => {
            formSubmit(data);
          })}
          style={{ width: '100%' }}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'1.5rem'}
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
                <CustomButton text='Назад' type='button' onClick={() => handleStepForm(1)} />
                <CustomButton text='Отправить' type='submit' disabled={isLoading} dataTestId='createAd' />
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};
