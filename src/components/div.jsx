import React, { useState } from "react";
import { SelectCurrency } from "./ListOfCurrencyFrom";
import { apiKey, url } from "./api";
import "../styles/TableStyle.css";

const CurrencyTable = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const handleConvert = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(toCurrency);
      const FactorCurrencyFrom = data.rates[fromCurrency.code] || data.rates["BYN"];
      const FactorCurrencyTo = data.rates[toCurrency.code] || data.rates["USD"];
      //console.log(FactorCurrencyFrom)
      //console.log(FactorCurrencyTo)
      //console.log(data);

      const result = (
        (parseFloat(fromValue) / FactorCurrencyFrom) *
        FactorCurrencyTo
      ).toFixed(2);
      setToValue(result);
    } catch (error) {
      console.error("Ошибка при конвертации валют:", error);
      setToValue("Проверьте данные");
    }
  };

  return (
    <table className="currency-table">
      <tbody>
        <tr>
          <td>
            <SelectCurrency
              className="CurrencyFrom"
              se
              onSelect={setFromCurrency}
            />
          </td>
          <td>
            <SelectCurrency className="CurrencyTo" onSelect={setToCurrency} />
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              className="currency-input"
              placeholder="Введите значение"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              className="currency-input"
              placeholder="Что бы облегчить поиск, кликните дважды по окну выбора валюты"
              value={toValue}
              readOnly
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <button className="CurrencyButton" onClick={handleConvert}>
              Конвертировать
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export { CurrencyTable };
