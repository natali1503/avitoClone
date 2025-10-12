import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormTrigger,
  useWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';

import { TUseDraftReturn, useDraft } from '../../../hooks/useDraft';
import { TypeFormData } from '../../../general/TypeFormData';
import { initValueForm } from '../../../general/FormField/InitValueForm';
import { getIdByText } from '../../../utils/getIdByText';
import { Categories } from '../../../general/FormField/Categories';

import { THandleStepForm } from './types';

export type TUseFormAdReturn = {
  draft: TUseDraftReturn['draft'];
  clearDraft: TUseDraftReturn['clearDraft'];

  currentStep: number;
  handleStepForm: THandleStepForm;

  formManagement: {
    control: Control<TypeFormData, any>;
    type: string;
    errors: FieldErrors<TypeFormData>;
    trigger: UseFormTrigger<TypeFormData>;
    reset: UseFormReset<TypeFormData>;
    handleSubmit: UseFormHandleSubmit<TypeFormData, undefined>;
  };
};

export const useFormAd = (originValueAd?: TypeFormData): TUseFormAdReturn => {
  const { draft, clearDraft, setDraft } = useDraft(originValueAd);

  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<TypeFormData>({
    defaultValues: draft || initValueForm,
    mode: 'onTouched',
  });

  const [currentStep, setCurrentStep] = useState(1);

  const type = getIdByText(Categories, useWatch({ control, name: 'type' }));

  const handleStepForm = (step: number) => setCurrentStep(step);

  //Сохранение данных в localStorage при изменении формы
  useEffect(() => {
    const subscription = watch((values) => {
      setDraft(values as TypeFormData);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setDraft]);

  return {
    draft,
    clearDraft,

    currentStep,
    handleStepForm,

    formManagement: {
      control,
      type,
      errors,
      trigger,
      reset,
      handleSubmit,
    },
  };
};
