import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name : 'todo',
    initialState : {
        todos : []
    },
    reducers : {
        addTodo : (state, action) => {
            console.log(action.payload)
            // state.todos = [...state.todos, todo]
        },
        removeTodo : (state, action) => {
            state.todos = action.payload
        }
    }
})

export const { addTodo, removeTodo, setTodo } = todoSlice.actions
export default todoSlice.reducer