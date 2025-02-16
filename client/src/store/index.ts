import { combineReducers, configureStore } from '@reduxjs/toolkit';

import adInfoSlice from './adInfoSlice';
import filtersSlice from './filtersSlice';
import announcementsSlice from './announcementsSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const rootReducer = combineReducers({
  adInfo: adInfoSlice,
  announcements: announcementsSlice,
  filters: filtersSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
