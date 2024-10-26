import React from 'react';
import Header from './components/header';
import Hero from './components/hero';
import CatalogPreview from './components/CatalogPreview';
import Footer from './components/footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <>
    <Header />
    <div className="AppContainer">
      <Hero />
      <CatalogPreview />
    </div>
    <Footer />
    </>
  );
}

export default App;