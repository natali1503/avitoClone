import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAdById } from '../api-actions';
import { AdResponse } from '../api/AdResponse';
import { Categories, CategoriesValues } from '../general/FormField/Categories';
import {
  CommonFields,
  FieldsByType,
} from '../general/FormField/formFieldNames';
import { getIdFields } from '../utils/getIdFields';

export interface IAdToDisplay {
  id: string;
  fieldName: string;
  value: string | number;
}

export interface IDataToDisplay {
  data: IAdToDisplay[];
  photo: string;
}

const adInfoSlice = createSlice({
  name: 'adInfo',
  initialState: {
    loading: false,
    data: <AdResponse | null>null,
    dataToDisplay: <IDataToDisplay | null>null,
    error: null,
  },
  reducers: {
    formattingDataForOutput: (state) => {
      if (!state.data) return;
      const dataToDisplay: IDataToDisplay = { data: [], photo: '' };

      const idCommonFields = getIdFields('commonFields');
      const idType = Categories.filter((el) => el.text === state?.data?.type)[0]
        .id as CategoriesValues;
      const additionalFieldsByType = FieldsByType[idType];
      const idAdditionalFieldsByType = getIdFields(idType);

      for (const [key, value] of Object.entries(state.data)) {
        if (idCommonFields.includes(key)) {
          const field = CommonFields.filter((el) => el.id === key)[0];
          if (field.id !== 'photo') {
            dataToDisplay.data.push({
              id: field.id,
              fieldName: field.fieldName,
              value,
            });
          } else {
            dataToDisplay.photo = value as string;
          }
        }
        if (idAdditionalFieldsByType.includes(key)) {
          const field = additionalFieldsByType.filter((el) => el.id === key)[0];
          dataToDisplay.data.push({
            id: field.id,
            fieldName: field.fieldName,
            value,
          });
        }
      }

      state.dataToDisplay = dataToDisplay;
    },
    updatedDataToDisplay: (state, action: PayloadAction<IAdToDisplay[]>) => {
      if (!state.dataToDisplay) return;
      const updatedData = [...action.payload];
      state.dataToDisplay = {
        data: updatedData,
        photo: state.dataToDisplay?.photo,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAdById.fulfilled,
        (state, action: PayloadAction<AdResponse>) => {
          state.error = null;
          state.data = action.payload;
          state.loading = false;
        },
      )
      .addCase(getAdById.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { formattingDataForOutput, updatedDataToDisplay } =
  adInfoSlice.actions;
export default adInfoSlice.reducer;
