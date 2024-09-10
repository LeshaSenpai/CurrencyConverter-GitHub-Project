import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Header} from './components/header/Header';
import {CurrencyConvert} from './pages/currecyConvert/CurrencyConvert';
import {NotFound} from './pages/NotFound';
import {Rates} from './pages/rates/Rates';
import {Footer} from './components/footer/Footer';
import './App.css';
import './components/selectCurrency/SelectCurrency.css';


function App() {
    return (
            <Router>
                <div className="page-container">
                    <Header/>
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<CurrencyConvert/>}/>
                            <Route path="/Rates" element={<Rates/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
    );
}

export default App;
