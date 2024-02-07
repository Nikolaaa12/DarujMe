import React, { useState } from 'react';
import image from '../resources/12345.jpg';
import '../styles/Product.css';

function Product({product}){



  return (
    <div className='product-card'>
      <img src={image} alt="Product" />
      <div className="product-content">
        <h2>{product.name}</h2>
        <h2>{product.description}</h2>
        <button className="download-button">Preuzmi</button>
      </div>
    </div>
  );
}

export default Product;
