import React, { useEffect, useState } from "react";
import { initialItems } from "./initialItems";
import { apiKey, url } from "./api";
import "../styles/Rate.css";

const Rates = () => {
  const [rates, setRates] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("currencyItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(initialItems);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("currencyItems", JSON.stringify(items));
    }
  }, [items]);

  const handleConvert = async (code) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.rates[code];
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return "N/A";
    }
  };

  useEffect(() => {
    const fetchRates = async () => {
      const ratesData = {};
      for (const item of items) {
        const rate = await handleConvert(item.code);
        ratesData[item.code] = rate;
      }
      setRates(ratesData);
    };

    fetchRates();
  }, [items]);

  const toggleFavorite = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      return updatedItems.sort((a, b) => b.isFavorite - a.isFavorite);
    });
  };

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
                    item.countyCode === "EU"
                      ? require("./images/eu.png")
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
                {rates[item.code] ? rates[item.code].toFixed(2) : "Loading..."}
              </td>
              <td className="center-content">
                <button onClick={() => toggleFavorite(item.id)}>
                  {item.isFavorite ? "⭐" : "☆"}
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
