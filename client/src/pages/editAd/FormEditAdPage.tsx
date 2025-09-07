import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { CommonFields, FieldsByType } from '../../general/FormField/formFieldNames';
import { Categories, CategoriesValues } from '../../general/FormField/Categories';
import { InitValueForm } from '../../general/FormField/InitValueForm';
import { IAd, TypeFormData } from '../../general/TypeFormData';
import { getIdByText } from '../../utils/getIdByText';

import { useDraft } from '../../hooks/useDraft';

import { adaptAdDataToType } from '../../utils/adaptAdDataToType';
import { Wrapper } from '../../components/ui/Wrapper';
import { Header } from '../../components/ui/Header';
import { Form } from 'react-router-dom';
import { CustomButton } from '../../components/ui/CustomButton';

interface IFormEditAd {
  formSubmit: SubmitHandler<TypeFormData>;
}

export const FormEditAdPage: FC<IFormEditAd> = ({ formSubmit }) => {
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
          const tempDraft = adaptAdDataToType(draft, type);
          setDraft(tempDraft);
          reset(tempDraft);
          handleClick(2);
        }
      }
    }
  };

  console.log(draft);

  return (
    <Wrapper>
      <Header header='Форма редактирования' />
      <Box display='flex' flexDirection='column' flexGrow={1} bgcolor={'rgba(245, 246, 245,0.4)'}>
        <form
          onSubmit={handleSubmit((data) => {
            finishingEditing(); // Очистка черновика после отправки
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
                <CustomButton text='Назад' type='button' onClick={() => handleClick(1)} disabled={currentStep === 2} />
                <CustomButton text='Отправить' type='submit' disabled={!!true} />
              </Box>
            )}
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};
