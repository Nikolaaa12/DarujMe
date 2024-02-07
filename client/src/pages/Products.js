import React, { useState } from 'react';
import '../styles/Products.css';
import Product from '../components/Product';

function Products() {
  const nizObjekata = [
    { ime: 'Frizider', tip: 'Bela tehnika' },
    { ime: 'Farmerice', tip: 'Odeca' },
    { ime: 'Stolica', tip: 'Namestaj' },
    { ime: 'Majica', tip: 'Odeca' },
  ];

  const [nameValue, setNameValue] = useState('');
  const [type, setType] = useState(null);

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const handleButtonClick = (selectedType) => {
    handleTypeChange(selectedType === type ? null : selectedType);
  };

  const filteredProducts = nizObjekata.filter((objekat) => {
    return objekat.ime.toLowerCase().includes(nameValue.toLowerCase());
  });

  const filteredAndTypedProducts = type
    ? filteredProducts.filter((objekat) => objekat.tip === type)
    : filteredProducts;

  return (
    <div>
      <div className='inputContainer'>
        <input
          type='text'
          placeholder='Search by name...'
          onChange={handleNameChange}
        />
      </div>
      <div className='tipFilterBar'>
        {['Bela tehnika', 'Namestaj', 'Odeca'].map((btnType) => (
          <button
            key={btnType}
            className={`tipDugme${type === btnType ? ' active' : ''}`}
            onClick={() => handleButtonClick(btnType)}
          >
            {btnType}
          </button>
        ))}
        <button
          id='prikaziSve'
          className={`tipDugme${type === null ? ' active' : ''}`}
          onClick={() => handleButtonClick(null)}
        >
          Prikazi sve
        </button>
      </div>
      <div className='productContainer'>
        {filteredAndTypedProducts.map((objekat, index) => (
          <Product key={index} objekat={objekat} />
        ))}
      </div>
      <p>Total: {filteredAndTypedProducts.length}</p>
    </div>
  );
}

export default Products;
