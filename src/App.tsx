import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import TravelDetails from "./pages/travel-details/travel-details";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel-details" element={<TravelDetails />} />
      </Routes>
    </div>
  );
};

export default App;
