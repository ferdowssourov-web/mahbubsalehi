import { useEffect } from 'react';
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import BiographyPage from "@/pages/BiographyPage";
import VisionPage from "@/pages/VisionPage";
import ActivitiesPage from "@/pages/ActivitiesPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <div className="App font-body">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biography" element={<BiographyPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
