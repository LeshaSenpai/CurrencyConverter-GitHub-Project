import React, { useState, useContext } from "react";
import { SelectCurrency } from "../../components/selectCurrency/SelectCurrency";
import { CurrencyContext } from '../../contexts/CurrencyContext';
import "./CurrencyConvert.css";
const CurrencyConvert = () => {
    const { rates } = useContext(CurrencyContext);
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
            }
            else {
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
                }
                else {
                    result = ((parseFloat(value) / FactorCurrencyTo) * FactorCurrencyFrom).toFixed(2);
                    setFromValue(result);
                }
            }
            catch (error) {
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
            }
            else {
                setToValue(value);
                setLastInputField("to");
            }
        }
    };
    return (React.createElement("div", { className: "table-wrapper" },
        React.createElement("table", { className: "currency-table" },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(SelectCurrency, { className: "CurrencyFrom", defaultCode: "BYN", onSelect: setFromCurrency })),
                    React.createElement("td", null,
                        React.createElement(SelectCurrency, { className: "CurrencyTo", defaultCode: "USD", onSelect: setToCurrency }))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", className: "currency-input", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", value: fromValue, onChange: (e) => handleInputChange(e, true) })),
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", className: "currency-input", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435", value: toValue, onChange: (e) => handleInputChange(e, false) }),
                        React.createElement("span", { className: "Error-message" }, errorMessage))),
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: "2" },
                        React.createElement("button", { className: "CurrencyButton", onClick: handleConvert }, "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C")))))));
};
export { CurrencyConvert };
