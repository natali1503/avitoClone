import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAnnouncements } from '../api/api-actions';
import { initState } from '../general/initState';
import { TAdResponse } from '../entities/ad/types';

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState: {
    loading: false,
    data: <TAdResponse[] | []>[],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncements.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnnouncements.fulfilled, (state, action: PayloadAction<TAdResponse[]>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getAnnouncements.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default announcementsSlice.reducer;
