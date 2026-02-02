import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name : 'filter',
    initialState : {
        status : 'all',
        filteredList : []
    },
    reducers : {
        changeStatus: (state, action) => {
            state.status = action.payload
        },
    }
})

export const { changeStatus } = filterSlice.actions
export default filterSlice.reducer