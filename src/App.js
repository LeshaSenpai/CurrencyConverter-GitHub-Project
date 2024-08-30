import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderCurrency } from './components/HeaderCurrency';
import { CurrencyConvert} from './Pages/CurrencyConvert';
import { NotFound } from './components/NotFound';
import { Rates } from './Pages/Rates';
import { Footer } from './components/FooterFixed'; 
import { CurrencyProvider } from './CurrencyContext';
import './App.css';
import './styles/CurrencyConvert.css';
import './styles/TableStyle.css';

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <div className="page-container">
          <HeaderCurrency />
          <main className="content">
            <Routes>
              <Route path="/" element={
                <div className="table-wrapper">
                  <CurrencyConvert className='leftSelectCurrency'/>
                </div>
              } />
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
