import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SelectCurrency } from './components/ListOfCurrencyFrom';
import { HeaderCurrency } from './components/HeaderCurrency';
import { CurrencyTable } from './components/div';
import { NotFound } from './components/NotFound';
import { Rates } from './components/Rates';
import { Footer } from './components/FooterFixed'; 
import './App.css';
import './styles/ListOfCurrencyFromStyle.css';
import './styles/TableStyle.css';

function App() {
  return (
    <Router>
      <div className="page-container">
        <HeaderCurrency />
        <main className="content">
          <Routes>
            <Route path="/" element={
              <div className="table-wrapper">
                <CurrencyTable className = 'leftSelectCurrency'/>
              </div>
            } />
            <Route path="/Rates" element={<Rates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
