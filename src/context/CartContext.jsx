import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            // Find existing item with same id, size AND color
            const existingItem = prevCart.find(item =>
                item.id === product.id && item.size === product.size && item.color === product.color
            );
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.size === product.size && item.color === product.color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === productId && item.size === size && item.color === color)
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};
