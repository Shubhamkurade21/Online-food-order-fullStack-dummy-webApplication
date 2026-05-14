import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';

const store = configureStore({
    reducer: {
        cartReducer: CartSlice.reducer
    }
})

export default store