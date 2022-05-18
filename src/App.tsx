import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import TravelDetails from "./pages/travel-details/travel-details";
import PageNotFound from "./pages/page-not-found/page-not-found";
import TravelSummaryPDF from "components/travel-summaryPDF";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel-details" element={<TravelDetails />} />
        <Route path="/a" element={<TravelSummaryPDF />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
