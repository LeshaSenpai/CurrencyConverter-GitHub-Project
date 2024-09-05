import React, {useState, useContext} from "react";
import {SelectCurrency} from "../../components/selectCurrency/SelectCurrency";
import {CurrencyContext} from '../../contexts/CurrencyContext';
import "./CurrencyConvert.css";

const CurrencyConvert = () => {
    const {rates} = useContext(CurrencyContext);
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [lastInputField, setLastInputField] = useState("from");

    const handleConvert = () => {
        setErrorMessage("");

        let value = lastInputField === "from" ? fromValue : toValue;

        if (value === "") {
            value = "1";
            if (lastInputField === "from") {
                setFromValue(value);
            } else {
                setToValue(value);
            }
        }

        if (value.endsWith(".")) {
            setErrorMessage("Ошибка ввода, после точки ожидаются символы");
            return;
        }

        if (rates) {
            try {
                const FactorCurrencyFrom = rates[fromCurrency.code] || rates["BYN"];
                const FactorCurrencyTo = rates[toCurrency.code] || rates["USD"];

                let result;

                if (lastInputField === "from") {
                    result = ((parseFloat(value) / FactorCurrencyFrom) * FactorCurrencyTo).toFixed(2);
                    setToValue(result);
                } else {
                    result = ((parseFloat(value) / FactorCurrencyTo) * FactorCurrencyFrom).toFixed(2);
                    setFromValue(result);
                }

            } catch (error) {
                setErrorMessage("Ошибка при конвертации валют, попробуйте снова");
            }
        }
    };

    const handleInputChange = (e, isFromField) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            if (isFromField) {
                setFromValue(value);
                setLastInputField("from");
            } else {
                setToValue(value);
                setLastInputField("to");
            }
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
                            defaultCode="BYN"
                            onSelect={setFromCurrency}
                        />
                    </td>
                    <td>
                        <SelectCurrency
                            className="CurrencyTo"
                            defaultCode="USD"
                            onSelect={setToCurrency}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="currency-input"
                            placeholder="Введите значение"
                            value={fromValue}
                            onChange={(e) => handleInputChange(e, true)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="currency-input"
                            placeholder="Введите значение"
                            value={toValue}
                            onChange={(e) => handleInputChange(e, false)}
                        />
                        <span className="Error-message">{errorMessage}</span>
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

export {CurrencyConvert};
