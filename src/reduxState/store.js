import { configureStore } from '@reduxjs/toolkit';
import { currencyReduser } from './currencySlice';
import { filterReducer } from './filterSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'currency',
  version: 1,
  storage,
  whitelist: ['baseCurrency'],
};

export const store = configureStore({
  reducer: {
    currency: persistReducer(persistConfig, currencyReduser),
    filter: filterReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
