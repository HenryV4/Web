import React from 'react';
import Header from '../components/common/header/header';
import Hero from '../components/home_page/hero/hero';
import CatalogPreview from '../components/home_page/CatalogPreview/CatalogPreview';
import Footer from '../components/common/footer/footer';
import '../App.css';

function Home() {
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

export default Home;