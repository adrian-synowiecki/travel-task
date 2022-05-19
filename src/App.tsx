import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import TravelDetails from "./pages/travel-details/travel-details";
import TravelSummary from "./pages/travel-summary/travel-summary";
import PageNotFound from "./pages/page-not-found/page-not-found";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel-details" element={<TravelDetails />} />
        <Route path="/travel-summary" element={<TravelSummary />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <p>j</p>
    </div>
  );
};

export default App;
