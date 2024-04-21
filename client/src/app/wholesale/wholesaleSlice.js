import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wholesale: [],
    loading: false,
    error: null,
}
export const wholesaleSlice = createSlice({
    name: 'wholesale',
    initialState,
    reducers: {
        addWholesaleStart: (state) => {
            state.loading = true
        },
        addWholesaleSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.wholesale.push(action.payload) // change this line
        },
        addWholesaleError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        getWholesaleSuccess: (state, action) => {
            state.wholesale = action.payload
        },
        logoutWholesale: (state) => {
            state.wholesale = []
        },
        updateWholesale: (state, action) => {
            state.wholesale = state.wholesale.map(item => item._id === action.payload._id ? action.payload : item)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addWholesaleStart, addWholesaleSuccess, addWholesaleError, getWholesaleSuccess, logoutWholesale, updateWholesale } = wholesaleSlice.actions

export default wholesaleSlice.reducer