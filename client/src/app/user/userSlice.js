import { createSlice } from '@reduxjs/toolkit'
const tokenFromStorage = localStorage.getItem('token');
const initialState = {
    loading: false,
    error: null,
    token: null,
    isAuthenticated: !!tokenFromStorage,
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
            state.error = null
        },
        signUpFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;

            // // Store token in local storage for persistence
            // localStorage.setItem('token', action.payload.token);
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOutSuccess: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        userLogout: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
            state.token = null;
        },
        // Update user Account 
        updateAccountStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAccountSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
    }
})

// Action creators are generated for each case reducer function
export const { signUpStart, signUpSuccess, signUpFailure, signInStart, signInSuccess, signOutSuccess, signInFailure, userLogout, updateAccountStart, updateAccountSuccess } = userSlice.actions

export default userSlice.reducer