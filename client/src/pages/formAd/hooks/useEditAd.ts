import { useLocation, useParams } from 'react-router-dom';
import { useRef } from 'react';

import { getIdByText } from '../../../utils/getIdByText';
import { Categories, CategoriesValues } from '../../../general/FormField/Categories';
import { CommonFields } from '../../../general/FormField/formFieldNames';
import { adaptAdDataToType } from '../../../utils/adaptAdDataToType';
import { IAd, TypeFormData } from '../../../general/TypeFormData';
import { TUseDraftReturn } from '../../../hooks/useDraft';

import { useFormAd } from './useFormAd';
import { TFormManagement, THandleClickNextStep } from './types';

export const useEditAd = (): TUseEditAdReturn => {
  const params = useParams();
  const id = params.id;
  const location = useLocation();
  const originValueAd: TypeFormData = location.state;
  const originTypeAd = useRef(originValueAd.type || '');

  const {
    draft,
    clearDraft,

    currentStep,
    handleStepForm,

    formManagement,
  } = useFormAd(originValueAd);

  const { type, trigger, reset } = formManagement;

  const handleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id) as (keyof IAd)[]);
    if (isValid) {
      const currentTypeId = getIdByText(Categories, originTypeAd.current) as CategoriesValues;
      //тип объявления не меняется
      if (currentTypeId === type) {
        handleStepForm(2);
      }
      //тип объявления меняется
      else {
        if (draft) {
          const tempDraft = adaptAdDataToType(draft, type);
          reset(tempDraft);
          handleStepForm(2);
        }
      }
    }
  };

  return {
    id,
    originTypeAd: originTypeAd.current,
    currentStep,

    formManagement: {
      control: formManagement.control,
      type,
      errors: formManagement.errors,
      handleSubmit: formManagement.handleSubmit,
    },

    handleStepForm,
    handleClickNextStep,
    clearDraft,
  };
};

export type TUseEditAdReturn = {
  id: string | undefined;
  originTypeAd: string;
  currentStep: number;
  formManagement: TFormManagement;
  handleStepForm: (step: number) => void;
  handleClickNextStep: THandleClickNextStep;
  clearDraft: TUseDraftReturn['clearDraft'];
};
