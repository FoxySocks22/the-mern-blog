import { configureStore, combineReducers } from '@reduxjs/toolkit'
import useReducer from './user/userSlice';
import messageReducer from './message/messageSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
    message: messageReducer,
    user: useReducer,
    theme: themeReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })
})

export const persistor = persistStore(store);

/* 
I am not going to lie, this part melted my brain, what the hell is actually 
going on here, was all of this really needed to simply access local 
storage, something that used to be a simple one liner?
*/