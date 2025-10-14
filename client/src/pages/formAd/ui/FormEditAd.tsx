import { SubmitHandler } from 'react-hook-form';
import { FC } from 'react';
import { Box } from '@mui/material';

import { TypeFormData } from '../../../general/TypeFormData';
import { CategoriesValues } from '../../../general/FormField/Categories';
import { CommonFields, FieldsByType } from '../../../general/FormField/formFieldNames';
import { Wrapper } from '../../../components/ui/Wrapper';
import { Header } from '../../../components/ui/Header';
import { CustomButton } from '../../../components/ui/CustomButton';

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
      <Box
        display='flex'
        flexDirection='column'
        flexGrow={1}
        bgcolor={'rgba(245, 246, 245,0.4)'}
        sx={{ width: '100%', height: '100%' }}
      >
        <form
          onSubmit={handleSubmit((data) => {
            formSubmit(data);
          })}
          style={{ width: '100%', height: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <Box display={'flex'} flexDirection={'column'} flex={1} minHeight={0} sx={{ width: '100%' }}>
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
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              mt: 'auto',
              display: 'flex',
              justifyContent: 'center',
              padding: { xs: '1rem 0 3rem 0', sm: '1rem 0 6rem 0' },
            }}
          >
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
