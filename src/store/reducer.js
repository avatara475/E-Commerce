import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from '../components/AddToCart/slice/CartSlice'
import wishlistReducer from '../components/Wishlist/slice/WishlistSlice'


const reducer = combineReducers({
    cart:cartReducer,
    wishlist:wishlistReducer,
})

export default reducer;