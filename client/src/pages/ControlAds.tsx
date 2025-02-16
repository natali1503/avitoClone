import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
//@ts-expect-error: for test
import React, { useEffect } from 'react';

import { createAd, deleteAdById, updatingAd } from '../api/api-actions';
import { FormCreateAd } from '../components/Forms/FormCreateAd';
import { FormEditAd } from '../components/Forms/FormEditAd';
import { TypeFormData } from '../general/TypeFormData';
import { RouterPath } from '../router/routerPath';
import { AdResponse } from '../api/AdResponse';
import { toBase64 } from '../utils/toBase64';
import { IDataToDisplay } from '../store/adInfoSlice';

export function PostingAds() {
  const location = useLocation();
  const dataForEditing: IDataToDisplay = location.state?.dataToDisplay;
  const id: string = location.state?.id;
  const navigate = useNavigate();

  const creationMode = !dataForEditing?.data.length;

  const onSubmit: SubmitHandler<TypeFormData> = async (formData: TypeFormData) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const file = formData.photo;
      const fileString = file && file[0] ? await toBase64(file[0]) : '';

      if (creationMode) {
        await createAd({ ...formData, photo: fileString } as AdResponse, signal);
      } else {
        const type = dataForEditing?.data.filter((el) => el.id === 'type')[0].value;

        if (type !== formData.type && dataForEditing) {
          // Тип объявления меняется - создаём новое и удаляем старое
          await createAd({ ...formData, photo: fileString } as AdResponse, signal);
          await deleteAdById(String(id), signal);
        } else {
          // Тип объявления не меняется
          await updatingAd({ ...formData, photo: fileString } as AdResponse, String(id), signal);
        }
      }
      navigate(RouterPath.List);
    } catch (error) {
      console.error('Ошибка при обработке формы:', error);
    } finally {
    }
  };

  return creationMode ? (
    <FormCreateAd onSubmit={onSubmit} />
  ) : (
    <FormEditAd onSubmit={onSubmit} dataForEditing={dataForEditing} />
  );
}
