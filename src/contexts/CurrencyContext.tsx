import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {fetchCurrencyData, getFavorite, addFavorite, removeFavorite, RawRatesType} from '../api/CurrencyApi';
import {initialItems} from "../components/initialItems";

type CurrencyProviderPropsType = {
    children?: ReactNode
}

export type ItemType = {
    text: string,
    symbol: string,
    code: string,
    currencyCode: string,
    rate: number
    isFavorite: boolean
}

export type CurrencyContextValue = {
    rates: RawRatesType | null;
    loading: boolean;
    error: string | null;
    items: ItemsType;
    toggleFavorite: (code: string) => void;
}

export type ItemsType = ItemType[]

export const CurrencyContext = createContext<CurrencyContextValue>({
    rates: {},
    loading: false,
    error: null,
    items: [],
    toggleFavorite: () => {},
})

export const CurrencyProvider = ({children}: CurrencyProviderPropsType) => {
    const [rates, setRates] = useState<RawRatesType | null>(null);
    const [items, setItems] = useState<ItemsType>([]);
    const [favorite, setFavorite] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getFavoriteData = async () => {
        const newFavorite = await getFavorite()
        setFavorite(newFavorite);
    }

    const addToFavorite = async (favoriteCode: string) => {
        await addFavorite(favoriteCode);
        getFavoriteData()
    };

    const removeFromFavorite = async (favoriteCode: string) => {
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
            .sort((a, b) => {
                if (a.isFavorite === b.isFavorite) {
                    return 0;
                }
                return a.isFavorite ? -1 : 1;
            });

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

    const toggleFavorite = (code:string) => {
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
            } as CurrencyContextValue}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
