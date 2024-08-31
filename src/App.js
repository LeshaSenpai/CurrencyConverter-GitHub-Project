import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { CurrencyConvert} from './pages/CurrencyConvert';
import { NotFound } from './pages/NotFound';
import { Rates } from './pages/Rates';
import { Footer } from './components/footer/Footer'; 
import { CurrencyProvider } from './components/contexts/CurrencyContext';
import './App.css';
import './styles/SelectCurrency.css';
import './styles/CurrencyConvert.css';


function App() {
  return (
    <CurrencyProvider>
      <Router>
        <div className="page-container">
          <Header/>
          <main className="content">
            <Routes>
              <Route path="/" element={<CurrencyConvert/>} />
              <Route path="/Rates" element={<Rates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
