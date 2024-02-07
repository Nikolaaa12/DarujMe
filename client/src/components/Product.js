import React, { useState } from 'react';
import image from '../resources/12345.jpg';
import '../styles/Product.css';

function Product({ objekat }) {
  const [isSelected, setSelected] = useState(false);

  const toggleSelection = () => {
    setSelected(!isSelected);
  };

  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`} onClick={toggleSelection}>
      <img src={image} alt="Product" />
      <div className="product-content">
        <h2>{objekat.ime}</h2>
        <p>{objekat.tip}</p>
        <button className="download-button">Preuzmi</button>
      </div>
    </div>
  );
}

export default Product;
