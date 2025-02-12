import { combineReducers, configureStore } from '@reduxjs/toolkit';

import adInfoSlice from './adInfoSlice';
import announcementsSlice from './announcementsSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const rootReducer = combineReducers({
  adInfo: adInfoSlice,
  announcements: announcementsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
