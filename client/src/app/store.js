// Store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import inventoryReducer from './inventory/inventorySlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import invoiceReducer from './invoice/invoiceSlice';

const rootReducer = combineReducers({
    user: userReducer,
    inventory: inventoryReducer,
    invoice: invoiceReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);