import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('todo/fetchTodos', 
    async () => {
        const res = await fetch('http://localhost:5000/todos')
        const data = await res.json()
        return data
})

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos:[],
    },
    extraReducers : builder => {
        builder.addCase(fetchTodos.fulfilled , (state, action) => {
            state.todos = action.payload
        })
    },
    reducers: {
        addTodo: (state, action) => {   
            state.todos.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        },
        toggleCompleteTodo: (state, action) => {
            
            const newTodos = state.todos.map(todo => {
                return todo?._id === action.payload._id ? {...todo,completed : action.payload.completed} : todo
            })
            state.todos = newTodos
        },
        editTodo: (state, action) => {
            const newTodos = state.todos.map(todo => {
                if (todo._id === action.payload._id) {
                    return { ...todo, editing: true }
                }
                return todo
            })
            state.todos = newTodos
        },
        updateTodo: (state, action) => {
            // console.log(action.payload);
            
            // const { todo, value } = action.payload
            const newTodos = state.todos.map((todo) => {
                if (todo._id === action.payload._id) {
                    return { ...todo, text : action.payload.text, editing: false };
                }
                return todo;
            });
            state.todos = newTodos
        },
        cancelUpdateTodo: (state, action) => {
            const newTodos = state.todos.map(todo => {
                if (todo._id === action.payload) {
                    return { ...todo, editing: false }
                }
                return todo
            })
            state.todos = newTodos
        },
        clearAllTodo : (state) => {
            state.todos = []
        }
    }
})

export const { addTodo, removeTodo, clearAllTodo, toggleCompleteTodo, editTodo, updateTodo, cancelUpdateTodo } = todoSlice.actions
export default todoSlice.reducer