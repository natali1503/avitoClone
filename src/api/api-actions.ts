import { createAsyncThunk } from '@reduxjs/toolkit';

import { AdResponse } from './AdResponse';
import { APIRoute } from './APIRoute';

import { api } from '.';

export const getAnnouncements = createAsyncThunk<AdResponse[], AbortSignal>('getAnnouncements', async (signal) => {
  try {
    const response = await api.get(APIRoute.getAds.path, { signal });
    if (response.status === 200) return response.data;
  } catch (e) {
    console.log(e);
  }
});

export const getAdById = createAsyncThunk<AdResponse, { id: string; signal: AbortSignal }>(
  'getAdById',
  async ({ id, signal }) => {
    try {
      const response = await api.get(`${APIRoute.getAdById.path}/${id}`, {
        signal,
      });
      if (response.status === 200) return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);

export const createAd = async (params: AdResponse, signal: AbortSignal) => {
  const response = await api.post(APIRoute.createAd.path, params, { signal });
  if (response.status === 200) return response.data;
};
export const updatingAd = async (params: AdResponse, id: string, signal: AbortSignal) => {
  const response = await api.put(`${APIRoute.updateAdById.path}/${id}`, params, { signal });
  if (response.status === 200) return response.data;
};

export const deleteAdById = async (id: string, signal: AbortSignal) => {
  try {
    const response = await api.delete(`${APIRoute.deleteAdById.path}/${id}`, { signal });
    if (response.status === 204) return response.data;
  } catch (e) {
    console.log(e);
  }
};
