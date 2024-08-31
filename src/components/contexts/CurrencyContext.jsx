import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrencyData, getFavorite, updateFavorite } from '../api/CurrencyApi';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(getFavorite());

  useEffect(() => {
    updateFavorite(favorite);
  }, [favorite]);

  useEffect(() => {
    const loadCurrencyData = async () => {
      try {
        const currencyData = await fetchCurrencyData();
        setData(currencyData);
      } catch (err) {
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadCurrencyData();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        data,
        loading,
        error,
        favorite,
        setFavorite,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
