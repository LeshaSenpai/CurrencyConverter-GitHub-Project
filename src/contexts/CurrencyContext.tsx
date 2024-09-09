import React, { createContext, useState, useEffect, ReactNode, ReactElement } from 'react';
import { fetchCurrencyData, getFavorite, addFavorite, removeFavorite } from '../api/CurrencyApi';
import { initialItems } from "../components/initialItems";

interface InitialCurrencyItem {
  code: string;
  text: string;
  symbol: string;
  currencyCode: string;
}

interface CurrencyItem {
  code: string;
  text: string;
  isFavorite: boolean;
  rate: number;
}

interface CurrencyContextType {
  rates: { [key: string]: number } | null;
  loading: boolean;
  error: string | null;
  items: CurrencyItem[];
  toggleFavorite: (code: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }): ReactElement | null => {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [items, setItems] = useState<CurrencyItem[]>([]);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getFavoriteData = async () => {
    const newFavorite = await getFavorite();
    setFavorite(newFavorite);
  };

  const addToFavorite = async (favoriteCode: string) => {
    await addFavorite(favoriteCode);
    getFavoriteData();
  };

  const removeFromFavorite = async (favoriteCode: string) => {
    await removeFavorite(favoriteCode);
    getFavoriteData();
  };

  useEffect(() => {
    if (!rates) {
      return;
    }
    const newItems: CurrencyItem[] = initialItems
      .map((item: InitialCurrencyItem) => ({
        code: item.code,
        text: item.text,
        isFavorite: favorite.includes(item.code),
        rate: rates[item.code] || 0,
      }))
      .sort((a: CurrencyItem, b: CurrencyItem) => Number(b.isFavorite) - Number(a.isFavorite));

    setItems(newItems);
  }, [rates, favorite]);

  useEffect(() => {
    getFavoriteData();
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

  const toggleFavorite = (code: string) => {
    const handler = favorite.includes(code) ? removeFromFavorite : addToFavorite;
    handler(code);
  };

  if (!rates || !items.length) {
    return null;
  }

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
