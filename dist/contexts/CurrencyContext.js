var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrencyData, getFavorite, addFavorite, removeFavorite } from '../api/CurrencyApi';
import { initialItems } from "../components/initialItems";
export const CurrencyContext = createContext(null);
export const CurrencyProvider = ({ children }) => {
    const [rates, setRates] = useState(null);
    const [items, setItems] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getFavoriteData = () => __awaiter(void 0, void 0, void 0, function* () {
        const newFavorite = yield getFavorite();
        setFavorite(newFavorite);
    });
    const addToFavorite = (favoriteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield addFavorite(favoriteCode);
        getFavoriteData();
    });
    const removeFromFavorite = (favoriteCode) => __awaiter(void 0, void 0, void 0, function* () {
        yield removeFavorite(favoriteCode);
        getFavoriteData();
    });
    useEffect(() => {
        if (!rates) {
            return;
        }
        const newItems = initialItems
            .map((item) => ({
            code: item.code,
            text: item.text,
            isFavorite: favorite.includes(item.code),
            rate: rates[item.code] || 0,
        }))
            .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        setItems(newItems);
    }, [rates, favorite]);
    useEffect(() => {
        getFavoriteData();
        const loadCurrencyData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const currencyData = yield fetchCurrencyData();
                setRates(currencyData);
            }
            catch (err) {
                setError('Ошибка при загрузке данных');
            }
            finally {
                setLoading(false);
            }
        });
        loadCurrencyData();
    }, []);
    const toggleFavorite = (code) => {
        const handler = favorite.includes(code) ? removeFromFavorite : addToFavorite;
        handler(code);
    };
    return (React.createElement(CurrencyContext.Provider, { value: {
            rates,
            loading,
            error,
            items,
            toggleFavorite,
        } }, children));
};
