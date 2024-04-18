import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: null,
    message: false,
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true
            state.error = null
        },
        signUpSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.message = true
            state.error = null
        },
        signUpFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { signUpStart, signUpSuccess, signUpFailure, signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer