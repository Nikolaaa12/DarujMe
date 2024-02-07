import React from 'react';
import Product from '../components/Product';
import '../styles/MyProducts.css'; // Import the styling if needed

function MyProducts() {
  const nizObjekata = [
    { ime: 'Frizider', tip: 'Bela tehnika' },
    { ime: 'Farmerice', tip: 'Odeca' },
    { ime: 'Stolica', tip: 'Namestaj' },
    { ime: 'Majica', tip: 'Odeca' },
  ];

  return (
    <div className='product-container'>
      {nizObjekata.map((objekat, index) => (
        <Product key={index} objekat={objekat} />
      ))}
    </div>
  );
}

export default MyProducts;
