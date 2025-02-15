import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
//@ts-expect-error: for test
import React from 'react';

import { createAd, deleteAdById, updatingAd } from '../api/api-actions';
import { FormCreateAd } from '../components/Forms/FormCreateAd';
import { FormEditAd } from '../components/Forms/FormEditAd';
import { TypeFormData } from '../general/TypeFormData';
import { RouterPath } from '../router/routerPath';
import { AdResponse } from '../api/AdResponse';
import { toBase64 } from '../utils/toBase64';
import { RootState } from '../store';

export function PostingAds() {
  const { dataToDisplay, data } = useSelector((state: RootState) => state.adInfo);
  const dataForEditing = dataToDisplay || null;
  const location = useLocation();
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
        if (data?.type !== formData.type && data) {
          // Тип объявления меняется - создаём новое и удаляем старое
          await createAd({ ...formData, photo: fileString } as AdResponse, signal);
          await deleteAdById(String(data.id), signal);
        } else {
          // Тип объявления не меняется
          await updatingAd({ ...formData, photo: fileString } as AdResponse, location.state.id, signal);
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
