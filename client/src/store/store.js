import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from './Slices/todoSlice'
import filterReducer from "./Slices/filterSlice";
import { persistReducer  } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    todoList : todoReducer,
    filter :  filterReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export const  persistor = persistStore(store)
export default store

