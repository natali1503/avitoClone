import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FieldsByType, IField } from '../general/FormField/formFieldNames';
import { CategoriesValues } from '../general/FormField/Categories';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchName: '',
    categories: <CategoriesValues | ''>'',
    listAdditionalFilters: <IField[]>[],
    additionalFiltersState: <{ [key in string]: string } | null>null,
  },
  reducers: {
    resetFilters: (state) => {
      state.searchName = '';
      state.categories = '';
      state.additionalFiltersState = null;
      state.listAdditionalFilters = [];
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    setCategories: (state, action: PayloadAction<CategoriesValues | ''>) => {
      const categories = action.payload;
      state.categories = action.payload;
      if (categories) {
        state.listAdditionalFilters = FieldsByType[categories];
        const tempAdditionalFiltersState = FieldsByType[categories].reduce(
          (acc, el) => {
            acc[el.id] = '';
            return acc;
          },
          {} as { [key in string]: string },
        );
        state.additionalFiltersState = tempAdditionalFiltersState;
      } else {
        state.listAdditionalFilters = [];
        state.additionalFiltersState = null;
      }
    },
    setAdditionalFiltersState: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const { id, value } = action.payload;
      state.additionalFiltersState = { ...state.additionalFiltersState, [id]: value };
    },
  },
  extraReducers: () => {},
});
export const { resetFilters, setSearchName, setCategories, setAdditionalFiltersState } = filtersSlice.actions;
export default filtersSlice.reducer;
