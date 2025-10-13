import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

import { IAd, TypeFormData } from '../../../general/TypeFormData';
import { CategoriesValues } from '../../../general/FormField/Categories';
import { CommonFields } from '../../../general/FormField/formFieldNames';
import { getIdFields } from '../../../utils/getIdFields';
import { TUseDraftReturn } from '../../../hooks/useDraft';

import { useFormAd } from './useFormAd';
import { THandleClickNextStep, THandleStepForm } from './types';

export type TUseCreateAdReturn = {
  clearDraft: TUseDraftReturn['clearDraft'];
  currentStep: number;
  formManagement: {
    control: Control<TypeFormData, any>;
    type: string;
    errors: FieldErrors<TypeFormData>;
    handleSubmit: UseFormHandleSubmit<TypeFormData, undefined>;
  };

  handleClickNextStep: THandleClickNextStep;
  handleStepForm: THandleStepForm;
};

export const useCreateAd = (): TUseCreateAdReturn => {
  const {
    draft,
    clearDraft,

    currentStep,
    handleStepForm,

    formManagement,
  } = useFormAd();
  const { type, trigger, reset } = formManagement;

  const handleClickNextStep: THandleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id) as (keyof IAd)[]);
    if (isValid) {
      const allFieldsId = [...getIdFields(type as CategoriesValues), ...getIdFields('commonFields')];
      const tempDraft = allFieldsId.reduce<Record<keyof TypeFormData, string | number | File[]>>(
        (acc, id) => {
          acc[id as keyof TypeFormData] = draft?.[id as keyof TypeFormData] ?? '';
          return acc;
        },
        {} as Record<keyof TypeFormData, string | number | File[]>,
      );

      reset(tempDraft as TypeFormData);
      handleStepForm(2);
    }
  };

  return {
    clearDraft,
    currentStep,
    handleClickNextStep,
    handleStepForm,

    formManagement: {
      control: formManagement.control,
      type,
      errors: formManagement.errors,
      handleSubmit: formManagement.handleSubmit,
    },
  };
};
