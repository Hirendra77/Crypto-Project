
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CoinPage from "./pages/Coin";
import ComparePage from "./pages/ComparePage";
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import WatchlistPage from "./pages/WatchlistPage";
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )


}

export default App;
