import React, {createContext, useState, useEffect} from 'react';
import {fetchCurrencyData, getFavorite, addFavorite, removeFavorite} from '../api/CurrencyApi';
import {initialItems} from "../components/initialItems";

export const CurrencyContext = createContext(null);

export const CurrencyProvider = ({children}) => {
    const [rates, setRates] = useState(null);
    const [items, setItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFavoriteData = async () => {
        const newFavorite = await getFavorite()
        setFavorite(newFavorite);
    }

    const addToFavorite = async (favoriteCode) => {
        await addFavorite(favoriteCode);
        getFavoriteData()
    };

    const removeFromFavorite = async (favoriteCode) => {
        await removeFavorite(favoriteCode);
        getFavoriteData()
    };

    useEffect(() => {
        if (!rates) {
            return
        }

        const newItems = initialItems
            .map((item) => ({
                ...item,
                isFavorite: favorite.includes(item.code),
                rate: rates[item.code] || 0,
            }))
            .sort((a, b) => b.isFavorite - a.isFavorite);

        setItems(newItems)
    }, [rates, favorite]);

    useEffect(() => {
        getFavoriteData()
        const loadCurrencyData = async () => {
            try {
                const currencyData = await fetchCurrencyData();
                setRates(currencyData);
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        loadCurrencyData();
    }, []);

    const toggleFavorite = (code) => {
        const handler = favorite.includes(code) ? removeFromFavorite : addToFavorite;
        handler(code);
    };

    return (
        <CurrencyContext.Provider
            value={{
                rates,
                loading,
                error,
                items,
                toggleFavorite,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
