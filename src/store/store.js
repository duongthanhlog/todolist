import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'

const store = configureStore({
    reducer : {
        todoList : todoReducer
    },
})

export default store