import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { QuoteProvider } from './context/QuoteContext';
import Home from './app/home';
import ProductsPage from './app/products';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProductDetail from './app/products/ProductDetail';
import QuotePage from './app/quote/QuotePage';
import './App.css'


function AppContent() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <QuoteProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QuoteProvider>
    </UserProvider>
  );
}

export default App
