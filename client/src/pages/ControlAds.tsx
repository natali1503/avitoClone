import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { createAd, deleteAdById, updatingAd } from '../api/api-actions';

import { TypeFormData } from '../general/TypeFormData';
import { RouterPath } from '../router/routerPath';

import { toBase64 } from '../utils/toBase64';
import { useDraft } from '../hooks/useDraft';
import { TAdResponse } from '../entities/ad/types';
import { FormCreateAdPage } from './createAd/FormCreateAdPage';
import { FormEditAdPage } from './editAd/FormEditAdPage';

export const ControlAds: FC = () => {
  const location = useLocation();
  const id: string = location.state?.id;
  const navigate = useNavigate();
  const { editMode, initTypeAd } = useDraft();

  const formSubmit: SubmitHandler<TypeFormData> = async (formData: TypeFormData) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const file = formData.photo;
      const fileString = file && file[0] ? await toBase64(file[0]) : '';

      if (!editMode) {
        await createAd({ ...formData, photo: fileString } as TAdResponse, signal);
      } else {
        if (initTypeAd !== formData.type) {
          // Тип объявления меняется - создаём новое и удаляем старое
          await createAd({ ...formData, photo: fileString } as TAdResponse, signal);
          await deleteAdById(String(id), signal);
        } else {
          // Тип объявления не меняется
          await updatingAd({ ...formData, photo: fileString } as TAdResponse, String(id), signal);
        }
      }
      navigate(RouterPath.List);
    } catch (error) {
      console.error('Ошибка при обработке формы:', error);
    }
  };

  return !editMode ? <FormCreateAdPage formSubmit={formSubmit} /> : <FormEditAdPage formSubmit={formSubmit} />;
};
