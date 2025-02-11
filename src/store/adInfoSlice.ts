import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAdById } from "../api-actions";
import { AdResponse } from "../api/AdResponse";

const adInfoSlice = createSlice({
  name: "adInfo",
  initialState: { loading: false, data: <AdResponse | null>null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdById.fulfilled, (state, action: PayloadAction<AdResponse[]>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload[0];
      })
      .addCase(getAdById.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default adInfoSlice.reducer;
