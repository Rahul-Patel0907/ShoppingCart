import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItem, Product } from "@/interfaces";
import Cookies from "js-cookie";

interface CartState {
    cartItems: cartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product.id === item.id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product.id === existItem.product.id
                        ? { ...x, qty: x.qty + 1 } // Increase quantity if item exists
                        : x
                );
            } else {
                state.cartItems = [...state.cartItems, { product: item, qty: 1 }]; // Add new item
            }
            Cookies.set('cart', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(
                (x) => x.product.id !== action.payload
            );
            Cookies.set('cart', JSON.stringify(state.cartItems));
        },
        incrementQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find((x) => x.product.id === action.payload);
            if (item) {
                item.qty += 1;
                Cookies.set('cart', JSON.stringify(state.cartItems));
            }
        },
        decrementQty: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find((x) => x.product.id === action.payload);
            if (item && item.qty > 1) {
                item.qty -= 1;
                Cookies.set('cart', JSON.stringify(state.cartItems));
            }
        },

        setCart: (state, action: PayloadAction<cartItem[]>) => {
            state.cartItems = action.payload;
        },

        clearCart: (state) => {
            state.cartItems = [];
            Cookies.remove('cart');
        },


    },
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
