import React, { useState } from "react";
import { SelectCurrency } from "../components/SelectCurrency";
import { fetchCurrencyData } from "../components/api";
import "../styles/TableStyle.css";

const CurrencyConvert = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const handleConvert = async () => {
    if (fromValue.endsWith(".")) {
      setToValue("Ошибка ввода, После точки ожидаются символы");
      return;
    }

    try {
      const data = await fetchCurrencyData();
      const FactorCurrencyFrom = data.rates[fromCurrency.code] || data.rates["BYN"];
      const FactorCurrencyTo = data.rates[toCurrency.code] || data.rates["USD"];

      const result = (
        (parseFloat(fromValue) / FactorCurrencyFrom) *
        FactorCurrencyTo
      ).toFixed(2);

      setToValue(result);
    } catch (error) {
      alert("Ошибка конвертации");
      console.error("Ошибка при конвертации валют:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromValue(value);
    }
  };

  return (
    <table className="currency-table">
      <tbody>
        <tr>
          <td>
            <SelectCurrency
              className="CurrencyFrom"
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
              onChange={handleInputChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="currency-input"
              placeholder="Результат конвертации"
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

export { CurrencyConvert};
