import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import Product from '../components/Product';
import axios from 'axios';

function Products({userId}) {

  const [productTypes, setProductTypes] = useState([]);
  

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/ProductType/GetAllProductType`);
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/Product/GetAllProducts`);

        var list = await response.data;
        setProducts(list.reverse());
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProducts();
  }, []);

  const [nameValue, setNameValue] = useState('');
  const [type, setType] = useState(null);

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleTypeChange = (type) => {
    setType(type);
    console.log(type);
  };


  const filtriraniObjekti = products.filter(objekat => {
    return objekat && objekat.name.toLowerCase().includes(nameValue.toLowerCase());
  });

  const filteredProducts = type ? filtriraniObjekti.filter(objekat => objekat.typeofProduct && objekat.typeofProduct.name === type) : filtriraniObjekti;

  const buttons = document.querySelectorAll('.tipDugme');
  const buttonShowAll = document.getElementById('prikaziSve');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button !== buttonShowAll) {
        buttons.forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      }
      else {
        buttons.forEach(btn => {
          btn.classList.remove('active');
        });
      }
    })
  })

  const refreshProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5238/api/Product/GetAllProducts`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
      <div className='products'>
        <br />
        <div className='tipFilterBar'>
          {productTypes.map(type => (
            <button className='tipDugme' onClick={() => handleTypeChange(type.name)}>{type.name}</button>
          ))}
          <button id='prikaziSve' className='tipDugme' onClick={() => handleTypeChange(null)}>Prikazi sve</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
          <input type='text' placeholder='Search by name...' onChange={handleNameChange}></input>
        </div>
        <div className='products-wrapper1'>
          {filteredProducts
            .filter(product => product.available === true && product.ownerId !== userId) // Filter products where available is true
            .map((product, index) => (
              <Product showButton2={false} showButton={true} key={index} product={product} userId={userId} refreshProducts={refreshProducts} />
            ))
          }
        </div>
      </div>
  );
}

export default Products;
