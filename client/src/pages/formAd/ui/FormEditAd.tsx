import { SubmitHandler } from 'react-hook-form';
import { FC } from 'react';
import { Box } from '@mui/material';

import { TypeFormData } from '../../../general/TypeFormData';
import { CategoriesValues } from '../../../general/FormField/Categories';
import { CommonFields, FieldsByType } from '../../../general/FormField/formFieldNames';
import { Wrapper } from '../../../components/tempName/Wrapper';
import { Header } from '../../../components/tempName/Header';
import { CustomButton } from '../../../components/tempName/CustomButton';

import { Form } from './Form';
import { TUseEditAdReturn } from '../hooks/useEditAd';
import { TFormManagement } from '../hooks/types';

interface IFormEditAd {
  formSubmit: SubmitHandler<TypeFormData>;
  isLoading: boolean;
  currentStep: any;
  formManagement: TFormManagement;

  handleClickNextStep: TUseEditAdReturn['handleClickNextStep'];
  handleStepForm: TUseEditAdReturn['handleStepForm'];
}

export const FormEditAd: FC<IFormEditAd> = ({
  formSubmit,
  isLoading,
  currentStep,
  formManagement,
  handleClickNextStep,
  handleStepForm,
}) => {
  const { handleSubmit, control, errors, type } = formManagement;
  return (
    <Wrapper>
      <Header header='Форма редактирования' />
      <Box display='flex' flexDirection='column' flexGrow={1} bgcolor={'rgba(245, 246, 245,0.4)'}>
        <form
          onSubmit={handleSubmit((data) => {
            formSubmit(data);
          })}
          // style={{ width: '100%', height: '100%' }}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'1rem'}
            width={'100%'}
            flex={1}
          >
            {currentStep === 1 && (
              <Form
                fields={CommonFields}
                formTitle={'Шаг 1'}
                control={control}
                errors={errors}
                dataTestId={'editAdStep1'}
              />
            )}

            {currentStep === 2 && (
              <Form
                fields={FieldsByType[type as CategoriesValues]}
                formTitle={'Шаг 2'}
                control={control}
                errors={errors}
                dataTestId={'editAdStep2'}
              />
            )}

            {currentStep === 1 && <CustomButton text='Далее' type='button' onClick={handleClickNextStep} />}

            {!!type && currentStep === 2 && (
              <Box display={'flex'} flexDirection={'row'} gap={'1rem'}>
                <CustomButton text='Назад' type='button' onClick={() => handleStepForm(1)} />
                <CustomButton text='Отправить' type='submit' disabled={isLoading} />
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};
