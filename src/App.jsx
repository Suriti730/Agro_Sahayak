import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Toaster from "./Components/Toaster";
import Home from "./Pages/Home";
import CropAdvisor from "./Pages/CropAdvisor";
import SoilTesting from "./Pages/SoilTesting";
import SellCrop from "./Pages/SellCrop";
import Equipment from "./Pages/Equipment";
import Weather from "./Pages/Weather";
import BuySell from "./Pages/BuySell";
import Mandi from "./Pages/Mandi";
import Marketplace from "./Pages/marketplace";
import AddToCart from "./Pages/AddToCart";
import Checkout from "./Pages/Checkout";
import Admin from "./Pages/Admin";


function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {location.pathname !== '/admin' && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crop-advisor" element={<CropAdvisor/>} />
        <Route path="/soil-testing" element={<SoilTesting />} />
        <Route path="/sell-crop" element={<SellCrop/>} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/buysell" element={<BuySell />} />
        <Route path="/mandi" element={<Mandi />} />
        <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
