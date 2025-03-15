import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create a slice for authentication
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: localStorage.getItem('user') ? true : false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isAuthenticated = false;
            state.user = null;
        },        
        setUser(state, action) {
            state.user = action.payload;
        }
    },
});

// Export actions
export const { login, logout,setUser } = authSlice.actions;

// Configure the store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;