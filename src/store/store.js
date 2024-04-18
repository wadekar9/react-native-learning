import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER,
  PERSIST,
  PAUSE,
  PURGE,
  REHYDRATE,
  FLUSH,
  persistStore,
  persistReducer
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version:1,
  whitelist:['auth']
};

const rootReducer = combineReducers({
  auth: AuthSlice,
});

const custumPersistReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: custumPersistReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

export const persister = persistStore(store);
