import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../types";

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        console.log("Текущая корзина (до добавления):", cart); // Логируем текущее состояние
        setCart((prevCart) => {
            const newCart = [...prevCart, product];
            console.log("Новая корзина (после добавления):", newCart); // Логируем новое состояние
            return newCart;
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
