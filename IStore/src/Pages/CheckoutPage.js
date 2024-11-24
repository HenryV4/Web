import React from 'react';
import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import CheckoutForm from '../components/checkout/CheckoutForm';

function CheckoutPage() {
  return (
    <>
      <Header />
      <div className="AppContainer">
        <h1 className='CheckoutLable'>Checkout</h1>
        <CheckoutForm />
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;
