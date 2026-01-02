"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setCart } from "./cartSlice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
        <InitCart />
        {children}</Provider>;
}

const InitCart = () => {
    useEffect(() => {
        const cart = Cookies.get("cart");
        if (cart) {
            store.dispatch(setCart(JSON.parse(cart)));
        }
    }, []);
    return null;
}
