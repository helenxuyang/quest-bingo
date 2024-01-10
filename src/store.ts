import { configureStore } from '@reduxjs/toolkit'
// import { apiSlice } from './features/quests/apiSlice';
import { useDispatch } from 'react-redux';
import { questReducer } from './features/quests/questSlice';

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    quests: questReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
