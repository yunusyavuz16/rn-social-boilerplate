import {configureStore} from '@reduxjs/toolkit';
import {baseApi} from './api/baseApi';
import {authSlice} from './slices/authSlice';
import networkReducer from './slices/networkSlice';

/**
 * Redux store configuration
 * Includes RTK Query API, auth slice, and network slice
 */
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSlice.reducer,
    network: networkReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

