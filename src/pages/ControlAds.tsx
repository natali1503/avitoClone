import { Box } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { createAd, updatingAd } from '../api-actions';
import { AdResponse } from '../api/AdResponse';
import { CustomButton } from '../components/CustomButton';
import { Form } from '../components/Form';
import { Title } from '../components/Title';
import { Categories } from '../general/FormField/Categories';
import {
  CommonFields,
  FieldsByType,
} from '../general/FormField/formFieldNames';
import { TypeFormData } from '../general/TypeFormData';
import { RouterPath } from '../router/routerPath';
import { RootState } from '../store';
import { getIdByText } from '../utils/getIdByText';
import { toBase64 } from '../utils/toBase64';

export function PostingAds() {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeFormData>({ mode: 'onTouched' });

  const { dataToDisplay } = useSelector((state: RootState) => state.adInfo);

  const location = useLocation();

  const dataForEditing = dataToDisplay || null;
  const type =
    getIdByText(Categories, useWatch({ control, name: 'type' })) ||
    Categories.filter(
      (el) =>
        el.text ===
        dataForEditing?.data?.filter((el) => el?.id === 'type')[0]?.value,
    )[0]?.id ||
    '';

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const creationMode = !dataForEditing?.data.length;

  const onSubmit: SubmitHandler<TypeFormData> = async (data: TypeFormData) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const file = data.photo;
    const fileString = (file && (await toBase64(file[0]))) || '';

    if (creationMode) {
      await createAd({ ...data, photo: fileString } as AdResponse, signal);
      navigate(RouterPath.List);
    } else {
      await updatingAd(
        { ...data, photo: fileString } as AdResponse,
        location.state.id,
        signal,
      );
      navigate(RouterPath.List);
    }
  };

  const handleClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id));

    if (isValid) handleClick(2);
  };
  console.log(errors);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'3rem'}
    >
      <Title
        title={creationMode ? 'Форма размещения' : 'Форма редактирования'}
      />
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
              fields={FieldsByType[type]}
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
}
