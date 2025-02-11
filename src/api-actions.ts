import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute } from "./api/APIRoute";
import { api } from "./api";
import { AdResponse } from "./api/AdResponse";

export const getAnnouncements = createAsyncThunk<AdResponse[]>("getAnnouncements", async () => {
  const response = await api.get(APIRoute.getAds.path);
  if (response.status === 200) return response.data;
});

export const getAdById = createAsyncThunk<AdResponse[], { id: string }>("getAdById", async (id) => {
  const response = await api.get(APIRoute.getAdById.path, { params: { id } });
  if (response.status === 200) return response.data;
});

export const createAd = async (params: any) => {
  console.log(params);
  const response = await api.post(APIRoute.createAd.path, params);
  if (response.status === 200) return response.data;
};
