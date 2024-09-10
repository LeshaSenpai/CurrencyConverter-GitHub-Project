import React, { useContext } from 'react';
import { CurrencyContext } from '../../contexts/CurrencyContext';
import './Rates.css';
const Rates = () => {
    const { loading, error, items, toggleFavorite, } = useContext(CurrencyContext);
    const handleFavorite = (currencyCode) => {
        toggleFavorite(currencyCode);
    };
    if (loading) {
        return React.createElement("div", null, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...");
    }
    if (error) {
        return React.createElement("div", null, error);
    }
    return (React.createElement("div", { className: "rates-container" },
        React.createElement("h1", null, "\u041A\u0443\u0440\u0441\u044B \u0432\u0430\u043B\u044E\u0442"),
        React.createElement("table", { className: "rates-table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "\u0424\u043B\u0430\u0433"),
                    React.createElement("th", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043B\u044E\u0442\u044B"),
                    React.createElement("th", null, "\u0421\u0438\u043C\u0432\u043E\u043B \u0432\u0430\u043B\u044E\u0442\u044B"),
                    React.createElement("th", { className: "rate-header" },
                        "\u041A\u0443\u0440\u0441 \u043A \u0434\u043E\u043B\u043B\u0430\u0440\u0443",
                        React.createElement("span", { className: "info-icon" }, "\u24D8"),
                        React.createElement("span", { className: "tooltip" }, "\u041A\u0443\u0440\u0441 \u043A \u0434\u043E\u043B\u043B\u0430\u0440\u0443 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043D\u0430 \u0442\u043E, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0435\u0434\u0438\u043D\u0438\u0446 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u044B \u043D\u0443\u0436\u043D\u043E, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C 1 \u0434\u043E\u043B\u043B\u0430\u0440")),
                    React.createElement("th", null, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"))),
            React.createElement("tbody", null, items.map((item) => (React.createElement("tr", { key: item.currencyCode },
                React.createElement("td", null,
                    React.createElement("img", { src: item.code === 'EUR'
                            ? `${process.env.PUBLIC_URL}/eu.png`
                            : `https://flagsapi.com/${item.currencyCode}/flat/64.png`, alt: `${item.text} flag`, width: "64", height: "64" })),
                React.createElement("td", null, item.text),
                React.createElement("td", { className: "center-content" }, item.symbol),
                React.createElement("td", { className: "center-content" }, item.rate
                    ? item.rate.toFixed(2)
                    : 'Loading...'),
                React.createElement("td", { className: "center-content" },
                    React.createElement("button", { onClick: () => handleFavorite(item.code) }, item.isFavorite ? '⭐' : '☆')))))))));
};
export { Rates };
