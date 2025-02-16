import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { CommonFields, FieldsByType } from '../../general/FormField/formFieldNames';
import { Categories, CategoriesValues } from '../../general/FormField/Categories';
import { IAd, TypeFormData } from '../../general/TypeFormData';
import { getIdByText } from '../../utils/getIdByText';
import { getIdFields } from '../../utils/getIdFields';
import { CustomButton } from '../CustomButton';
import { Title } from '../Title';
import { useDraft } from '../../hooks/useDraft';
import { InitValueForm } from '../../general/FormField/InitValueForm';

import { Form } from './Form';

interface IFormEditAd {
  formSubmit: SubmitHandler<TypeFormData>;
}

export const FormEditAd: FC<IFormEditAd> = ({ formSubmit }) => {
  const { draft, setDraft, finishingEditing, initTypeAd } = useDraft();
  const {
    control,
    watch,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TypeFormData>({
    defaultValues: draft || InitValueForm,
    mode: 'onTouched',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const type =
    getIdByText(Categories, useWatch({ control, name: 'type' })) ||
    Categories.filter((el) => el.text === initTypeAd)[0]?.id;

  const handleClick = (step: number) => setCurrentStep(step);

  //Сохранение данных в localStorage при изменении формы
  useEffect(() => {
    const subscription = watch((values) => {
      setDraft(values as TypeFormData);
    });

    return () => subscription.unsubscribe();
  }, [watch, setDraft]);

  const handleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id) as (keyof IAd)[]);
    if (isValid) {
      const currentTypeId = getIdByText(Categories, initTypeAd) as CategoriesValues;
      //тип объявления не меняется
      if (currentTypeId === type) {
        handleClick(2);
      }
      //тип объявления меняется
      else {
        if (draft) {
          const allFieldsId = [...getIdFields(type as CategoriesValues), ...getIdFields('commonFields')];
          const tempDraft = allFieldsId.reduce<Record<keyof TypeFormData, string | number | File[]>>(
            (acc, id) => {
              acc[id as keyof TypeFormData] = draft?.[id as keyof TypeFormData] ?? '';
              return acc;
            },
            {} as Record<keyof TypeFormData, string | number | File[]>,
          );
          setDraft(tempDraft as TypeFormData);
          reset(tempDraft as TypeFormData);
          handleClick(2);
        }
      }
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'3rem'}>
      <Title title={'Форма редактирования'} />
      <form
        onSubmit={handleSubmit((data) => {
          finishingEditing(); // Очистка черновика после отправки
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
              <CustomButton text='Назад' type='button' onClick={() => handleClick(1)} disabled={currentStep === 2} />
              <CustomButton text='Отправить' type='submit' disabled={!!true} />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};
