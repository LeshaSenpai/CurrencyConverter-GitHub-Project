import React from 'react';
import { observer } from 'mobx-react-lite';
import { currencyStore } from '../../stores/CurrencyStore';
import './Rates.css';

const Rates = observer(() => {
    const {
        loading,
        error,
        items,
        toggleFavorite,
    } = currencyStore;

    const handleFavorite = (currencyCode: string) => {
        toggleFavorite(currencyCode);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                    </th>
                    <th>Избранное</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.currencyCode}>
                        <td>
                            <img
                                src={
                                    item.code === 'EUR'
                                        ? `${process.env.PUBLIC_URL}/eu.png`
                                        : `https://flagsapi.com/${item.currencyCode}/flat/64.png`
                                }
                                alt={`${item.text} flag`}
                                width="64"
                                height="64"
                            />
                        </td>
                        <td>{item.text}</td>
                        <td className="center-content">{item.symbol}</td>
                        <td className="center-content">
                            {item.rate
                                ? item.rate.toFixed(2)
                                : 'Loading...'}
                        </td>
                        <td className="center-content">
                            <button onClick={() => handleFavorite(item.code)}>
                                {item.isFavorite ? '⭐' : '☆'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
});

export { Rates };
