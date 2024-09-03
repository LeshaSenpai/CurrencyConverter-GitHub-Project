import React, { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import { initialItems } from '../../components/initialItems';
import './Rates.css';

const Rates = () => {
  const {
    data,
    loading,
    error,
    favorite,
    setFavorite,
  } = useContext(CurrencyContext);

  const loadItems = () => {
    return initialItems
      .map(item => ({
        ...item,
        isFavorite: favorite.includes(item.code),
      }))
      .sort((a, b) => b.isFavorite - a.isFavorite);
  };

  const [items, setItems] = useState(loadItems);

  useEffect(() => {
    const updatedFavorites = items
      .filter(item => item.isFavorite)
      .map(item => item.code);
    setFavorite(updatedFavorites);
  }, [items, setFavorite]);

  const getRateForCurrency = (code) => {
    if (!data || !data.rates) {
      return 'N/A';
    }
    return data.rates[code] || 'N/A';
  };

  const handleFavorite = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      return updatedItems.sort((a, b) => b.isFavorite - a.isFavorite);
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rates-container">
      <h1>Курсы валют</h1>
      <table className="rates-table">
        <thead>
          <tr>
            <th>Флаг</th>
            <th>Название валюты</th>
            <th>Символ валюты</th>
            <th className="rate-header">
              Курс к доллару
              <span className="info-icon">ⓘ</span>
              <span className="tooltip">
                Курс к доллару указывает на то, сколько единиц определённой
                валюты нужно, чтобы получить 1 доллар
              </span>
            </th>
            <th>Избранное</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={
                    item.countyCode === 'EU'
                      ? `${process.env.PUBLIC_URL}/eu.png`
                      : `https://flagsapi.com/${item.countyCode}/flat/64.png`
                  }
                  alt={`${item.text} flag`}
                  width="64"
                  height="64"
                />
              </td>
              <td>{item.text}</td>
              <td className="center-content">{item.symbol}</td>
              <td className="center-content">
                {getRateForCurrency(item.code) !== 'N/A'
                  ? getRateForCurrency(item.code).toFixed(2)
                  : 'Loading...'}
              </td>
              <td className="center-content">
                <button onClick={() => handleFavorite(item.id)}>
                  {item.isFavorite ? '⭐' : '☆'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Rates };
