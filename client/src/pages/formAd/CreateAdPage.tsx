import { FC, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { TypeFormData } from '../../general/TypeFormData';
import { toBase64 } from '../../utils/toBase64';
import { TAdResponse } from '../../entities/ad/types';
import { RouterPath } from '../../router/routerPath';
import { createAd } from '../../api/api-actions';

import { FormCreateAd } from './ui/FormCreateAd';
import { useCreateAd } from './hooks/useCreateAd';

export const CreateAdPage: FC = () => {
  const navigate = useNavigate();

  const { clearDraft, currentStep, handleClickNextStep, handleStepForm, formManagement } = useCreateAd();
  const [isLoading, setIsLoading] = useState(false);
  const isSubmittedRef = useRef(false);

  // Очистка черновика при размонтировании компонента (переход назад)
  useEffect(() => {
    return () => {
      if (!isSubmittedRef.current) {
        clearDraft();
      }
    };
  }, [clearDraft]);

  const formSubmit: SubmitHandler<TypeFormData> = async (formData: TypeFormData) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const file = formData.photo;
      const fileString = file && file[0] ? await toBase64(file[0]) : '';
      setIsLoading(true);
      await createAd({ ...formData, photo: fileString } as TAdResponse, signal);
      isSubmittedRef.current = true;
      clearDraft(); // Очистка черновика после отправки
      navigate(RouterPath.List);
      toast.success('Объявление создано');
    } catch (error) {
      toast.error('Ошибка при обработке формы');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormCreateAd
      formSubmit={formSubmit}
      isLoading={isLoading}
      formManagement={formManagement}
      currentStep={currentStep}
      handleClickNextStep={handleClickNextStep}
      handleStepForm={handleStepForm}
    />
  );
};
