import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Z][a-zA-Z]*$/, 'First Name must start with a capital letter and contain only letters')
        .min(2, 'First Name must be at least 2 characters')
        .required('First Name is required'),
      lastName: Yup.string()
        .matches(/^[A-Z][a-zA-Z]*$/, 'Last Name must start with a capital letter and contain only letters')
        .min(2, 'Last Name must be at least 2 characters')
        .required('Last Name is required'),
      email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email address')
        .required('Email is required'),
      phone: Yup.string()
        .matches(/^\d+$/, 'Phone must contain only numbers')
        .min(10, 'Phone must be at least 10 digits')
        .max(15, 'Phone must not exceed 15 digits')
        .required('Phone is required'),
      address: Yup.string()
        .min(5, 'Address must be at least 5 characters')
        .required('Address is required'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      window.location.href = '/success'; // Navigate to Success page
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="error">{formik.errors.address}</div>
        ) : null}
      </div>

      {Object.keys(formik.errors).length > 0 && formik.touched && (
        <div className="error-box">
          Oh snap! Change a few things and try submitting again.
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => (window.location.href = '/cart')}
        >
          Go Back
        </button>
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
