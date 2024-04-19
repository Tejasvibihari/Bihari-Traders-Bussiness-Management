import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    inventory: [],
    loading: false,
    error: null,
}
export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addInventoryStart: (state) => {
            state.loading = true
        },
        addInventorySuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.inventory.push(action.payload) // change this line
        },
        addInventoryError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        getInventorySuccess: (state, action) => {
            state.inventory = action.payload
        },
        logoutInventory: (state) => {
            state.inventory = []
        },
        updateInventory: (state, action) => {
            state.inventory = state.inventory.map(item => item._id === action.payload._id ? action.payload : item)
        }
    }
})

// Action creators are generated for each case reducer function
export const { addInventoryStart, addInventorySuccess, addInventoryError, getInventorySuccess, logoutInventory, updateInventory } = inventorySlice.actions

export default inventorySlice.reducer