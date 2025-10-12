import { FC, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { TypeFormData } from '../../general/TypeFormData';
import { toBase64 } from '../../utils/toBase64';
import { TAdResponse } from '../../entities/ad/types';
import { createAd, deleteAdById, updatingAd } from '../../api/api-actions';

import { FormEditAd } from './ui/FormEditAd';
import { useEditAd } from './hooks/useEditAd';

export const EditAdPage: FC = () => {
  const navigate = useNavigate();
  const { id, originTypeAd, currentStep, formManagement, handleStepForm, handleClickNextStep, clearDraft } =
    useEditAd();

  const [isLoading, setIsLoading] = useState(false);
  const isSubmittedRef = useRef(false);

  // Очистка черновика при размонтировании компонента (переход назад, смена URL)
  useEffect(() => {
    return () => {
      if (!isSubmittedRef.current) {
        console.log(123);

        clearDraft();
      }
    };
  }, [clearDraft]);

  const formSubmit: SubmitHandler<TypeFormData> = async (formData: TypeFormData) => {
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const file = formData.photo;
      const fileString = file && file[0] ? await toBase64(file[0]) : '';
      setIsLoading(true);
      if (originTypeAd !== formData.type) {
        // Тип объявления меняется - создаём новое и удаляем старое
        await createAd({ ...formData, photo: fileString } as TAdResponse, signal);
        await deleteAdById(String(id), signal);
      } else {
        // Тип объявления не меняется
        await updatingAd({ ...formData, photo: fileString } as TAdResponse, String(id), signal);
      }
      isSubmittedRef.current = true; // Помечаем, что форма успешно отправлена
      navigate(`/item/${id}`);
      toast.success('Объявление изменено');
    } catch (error) {
      toast.error('Ошибка при обработке формы');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormEditAd
      formSubmit={formSubmit}
      isLoading={isLoading}
      formManagement={formManagement}
      currentStep={currentStep}
      handleClickNextStep={handleClickNextStep}
      handleStepForm={handleStepForm}
    />
  );
};
