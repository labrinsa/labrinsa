import React, { createContext, useContext, useState, useEffect } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
    const [quoteItems, setQuoteItems] = useState(() => {
        // Cargar desde localStorage al iniciar
        if (typeof window !== 'undefined') {
            const savedQuote = localStorage.getItem('labrinsa_quote');
            return savedQuote ? JSON.parse(savedQuote) : [];
        }
        return [];
    });

    useEffect(() => {
        // Guardar en localStorage cuando cambie quoteItems
        localStorage.setItem('labrinsa_quote', JSON.stringify(quoteItems));
    }, [quoteItems]);

    const addToQuote = (product, quantity = 1) => {
        setQuoteItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromQuote = (productId) => {
        setQuoteItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromQuote(productId);
            return;
        }
        setQuoteItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearQuote = () => {
        setQuoteItems([]);
    };

    const totalItems = quoteItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <QuoteContext.Provider value={{
            quoteItems,
            addToQuote,
            removeFromQuote,
            updateQuantity,
            clearQuote,
            totalItems
        }}>
            {children}
        </QuoteContext.Provider>
    );
};

export const useQuote = () => {
    const context = useContext(QuoteContext);
    if (!context) {
        throw new Error('useQuote debe usarse dentro de un QuoteProvider');
    }
    return context;
};
