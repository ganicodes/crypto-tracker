import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CurrencyState from './context/CurrencyState';
import CoinPage from './pages/CoinPage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <CurrencyState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </CurrencyState>
  );
}

export default App;
