import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        removeTodo: (state, action) => {
            const newTodos = state.todos.filter(item => item.id !== action.payload.id)
            state.todos = newTodos
        },
        toggleCompleteTodo: (state, action) => {
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, completed: !action.payload.completed }
                }
                return item
            })
            state.todos = newTodos
        },
        editTodo: (state, action) => {
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, editing: true }
                }
                return item
            })
            state.todos = newTodos
        },
        updateTodo: (state, action) => {
            const { todo, value } = action.payload
            const newTodos = state.todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, text : value, editing: false };
                }
                return item;
            });
            state.todos = newTodos
        },
        cancelUpdateTodo: (state, action) => {
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, editing: false }
                }
                return item
            })
            state.todos = newTodos
        },
        clearAllTodo : (state) => {
            state.todos = []
        }
    }
})

export const { addTodo, removeTodo, clearAllTodo, setTodo, toggleCompleteTodo, editTodo, updateTodo, cancelUpdateTodo } = todoSlice.actions
export default todoSlice.reducer