import React from 'react';
import './SuccessMessage.css'; // Component-specific CSS
import success_icon from '../../images/success_icon.jpg'

const SuccessMessage = () => {
  return (
    <div className="success-message-container">
      <img
        src={success_icon} // Replace with the path to your success icon
        alt="Success"
        className="success-icon"
      />
      <h1 className="success-title">Success!</h1>
      <p className="success-text">
        Your order was sent to processing! Check your email box for more details.
      </p>
      <a href="/catalog" className="success-button">
        Go back to Catalog
      </a>
    </div>
  );
};

export default SuccessMessage;
