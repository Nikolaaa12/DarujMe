import React, { useState } from 'react';
import image from '../resources/12345.jpg';
import '../styles/Product.css';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product({product, showButton, userId}){

  const [data, setData] = useState({
    ownerId:'',
    productId:'',
    customerId:''
  });

  function submit(e) {
    e.preventDefault();

    if (userId === '-1') {
      // Display an error message or redirect to the login page
      toast.error('You need to log in to take a product', {
        className: 'custom-toast',
      bodyClassName: 'custom-toast-body',
      autoClose: 3000,
      });
      return;
    }

  const isConfirmed = window.confirm('Are you sure you want create reservation?');

  if (!isConfirmed) {
    // User clicked "Cancel" in the confirmation dialog
    return;
  }
    axios.post('http://localhost:5238/api/Reservation/CreateReservation', {
      ownerId: product.ownerId,
      productId: product.id,
      customerId: userId
    })
      .then(res => {
        toast.success('Created Reservation!', {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });
        product.available=false;
      })
  }

  return (
    <div className='product-card'>
      <img src={image} alt="Product" />
      <div className="product-content">
        <h2>{product.name}</h2>
        <h2>{product.description}</h2>
        {showButton && <button type="submit" onClick={(e) => submit(e)} className="download-button">Preuzmi</button>}
      </div>
    </div>
  );
}

export default Product;
