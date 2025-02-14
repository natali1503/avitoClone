import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAnnouncements } from '../api-actions';
import { AdResponse } from '../api/AdResponse';

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState: {
    loading: false,
    data: <AdResponse[] | null>null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncements.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnnouncements.fulfilled, (state, action: PayloadAction<AdResponse[]>) => {
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
