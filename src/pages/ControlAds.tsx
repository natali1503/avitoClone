import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
//@ts-expect-error: for test
import React from 'react';

import { FormCreateAd } from '../components/FormCreateAd';
import { TypeFormData } from '../general/TypeFormData';
import { createAd, updatingAd } from '../api-actions';
import { FormEditAd } from '../components/FormEditAd';
import { RouterPath } from '../router/routerPath';
import { AdResponse } from '../api/AdResponse';
import { toBase64 } from '../utils/toBase64';
import { RootState } from '../store';

export function PostingAds() {
  const { dataToDisplay } = useSelector((state: RootState) => state.adInfo);
  const dataForEditing = dataToDisplay || null;

  const location = useLocation();
  const navigate = useNavigate();

  const creationMode = !dataForEditing?.data.length;

  const onSubmit: SubmitHandler<TypeFormData> = async (data: TypeFormData) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const file = data.photo;
    const fileString = (file && (await toBase64(file[0]))) || '';

    if (creationMode) {
      await createAd({ ...data, photo: fileString } as AdResponse, signal);
      navigate(RouterPath.List);
    } else {
      await updatingAd(
        { ...data, photo: fileString } as AdResponse,
        location.state.id,
        signal,
      );
      navigate(RouterPath.List);
    }
  };

  return creationMode ? (
    <FormCreateAd onSubmit={onSubmit} />
  ) : (
    <FormEditAd onSubmit={onSubmit} dataForEditing={dataForEditing} />
  );
}
