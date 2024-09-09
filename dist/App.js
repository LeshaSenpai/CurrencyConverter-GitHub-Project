import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { CurrencyConvert } from './pages/currecyConvert/CurrencyConvert';
import { NotFound } from './pages/NotFound';
import { Rates } from './pages/rates/Rates';
import { Footer } from './components/footer/Footer';
import { CurrencyProvider } from './contexts/CurrencyContext';
import './App.css';
import './components/selectCurrency/SelectCurrency.css';
function App() {
    return (React.createElement(CurrencyProvider, null,
        React.createElement(Router, null,
            React.createElement("div", { className: "page-container" },
                React.createElement(Header, null),
                React.createElement("main", { className: "content" },
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/", element: React.createElement(CurrencyConvert, null) }),
                        React.createElement(Route, { path: "/Rates", element: React.createElement(Rates, null) }),
                        React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) }))),
                React.createElement(Footer, null)))));
}
export default App;
