import React from 'react';
// import Header from '../components/common/header/header';
import Footer from '../components/common/footer/footer';
import SuccessMessage from '../components/success/SuccessMessage';

function SuccessPage() {
  return (
    <>
      {/* <Header /> */}
      <div className="success-page">
        <SuccessMessage />
      </div>
      <Footer />
    </>
  );
}

export default SuccessPage;
