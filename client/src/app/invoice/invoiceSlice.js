import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    invoice: [],
    filterInvoice: [],
    loading: false,
    error: null,
}
export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        addInvoiceStart: (state) => {
            state.loading = true
        },
        addInvoiceSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.invoice.push(action.payload) // change this line
        },
        addInvoiceError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        getInvoiceSuccess: (state, action) => {
            state.invoice = action.payload
        },
        logoutInvoice: (state) => {
            state.invoice = []
        },
        updateInvoice: (state, action) => {
            state.invoice = state.invoice.map(item => item._id === action.payload._id ? action.payload : item)
        },
        addFilterInvoice: (state, action) => {
            state.filterInvoice = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { addInvoiceStart, addInvoiceSuccess, addInvoiceError, getInvoiceSuccess, logoutInvoice, updateInvoice, addFilterInvoice } = invoiceSlice.actions

export default invoiceSlice.reducer