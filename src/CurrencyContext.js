import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrencyData } from './components/api';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <CurrencyContext.Provider value={{ data, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
};
