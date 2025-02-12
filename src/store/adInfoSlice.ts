import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAdById } from "../api-actions";
import { AdResponse } from "../api/AdResponse";
import { Categories, CommonFields, FieldsByType } from "../FormField/formFieldNames";

const adInfoSlice = createSlice({
  name: "adInfo",
  initialState: { loading: false, data: <AdResponse | null>null, dataToDisplay: null, error: null },
  reducers: {
    formattingDataForOutput: (state) => {
      const dataToDisplay: { [key in string]: string }[] = [];
      const idCommonFields = CommonFields.map((el) => el.id);
      const idType = Categories.filter((el) => el.text === state?.data?.type)[0].id;
      const additionalFieldsByType = FieldsByType[idType];
      const idAdditionalFieldsByType = additionalFieldsByType.map((el) => el.id);
      const photo = {};
      for (const [key, value] of Object.entries(state.data)) {
        if (idCommonFields.includes(key)) {
          const field = CommonFields.filter((el) => el.id === key)[0];
          if (field.id !== "photo") {
            dataToDisplay.push({ id: field.id, fieldName: field.text, value });
          } else {
            photo.photo = value;
          }
        }
        if (idAdditionalFieldsByType.includes(key)) {
          const field = additionalFieldsByType.filter((el) => el.id === key)[0];
          dataToDisplay.push({ id: field.id, fieldName: field.text, value });
        }
      }

      state.dataToDisplay = { data: dataToDisplay, photo };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdById.fulfilled, (state, action: PayloadAction<AdResponse>) => {
        state.error = null;
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getAdById.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { formattingDataForOutput } = adInfoSlice.actions;
export default adInfoSlice.reducer;
