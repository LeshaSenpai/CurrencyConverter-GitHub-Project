import React, { useState, useContext } from "react";
import { SelectCurrency } from "../components/SelectCurrency";
import { CurrencyContext } from '../components/contexts/CurrencyContext';
import "../styles/CurrencyConvert.css";

const CurrencyConvert = () => {
  const { data } = useContext(CurrencyContext); 
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const handleConvert = () => {
    if (fromValue.endsWith(".")) {
      setToValue("Ошибка ввода, после точки ожидаются символы");
      return;
    }

    if (data) {
      try {
        const FactorCurrencyFrom = data.rates[fromCurrency.code] || data.rates["BYN"];
        const FactorCurrencyTo = data.rates[toCurrency.code] || data.rates["USD"];

        const result = (
          (parseFloat(fromValue) / FactorCurrencyFrom) *
          FactorCurrencyTo
        ).toFixed(2);

        setToValue(result);
      } catch (error) {
        setToValue("Ошибка при конвертации валют, попробуйте снова");
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setFromValue(value);
    }
  };

  return (
    <div className="table-wrapper">
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
    </div>
  );
};

export { CurrencyConvert };
