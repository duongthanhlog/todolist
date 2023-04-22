import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
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
        handleEditTodo: (state, action) => {
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, editing: true }
                }
                return item
            })
            state.todos = newTodos
        },
        handleUpdateTodo: (state, action) => {
            const { todo, value } = action.payload
            const newTodos = state.todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, text : value, editing: false };
                }
                return item;
            });
            state.todos = newTodos
        },
        handleCancelUpdataTodo: (state, action) => {
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, editing: false }
                }
                return item
            })
            state.todos = newTodos
        },
        handleRemoveAll : (state) => {
            state.todos = []
        }
    }
})

export const { addTodo, removeTodo, handleRemoveAll, setTodo, toggleCompleteTodo, handleEditTodo, handleUpdateTodo, handleCancelUpdataTodo } = todoSlice.actions
export default todoSlice.reducer