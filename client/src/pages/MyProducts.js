import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import '../styles/MyProducts.css';

function MyProducts({userId}) {

  const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`http://localhost:5238/api/User/GetUserById?id=${userId}`); // Adjust the URL according to your backend route
            
            if (!response.data) {
              setUser(null);
            } else {
              setUser(response.data);
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchUser();
    }, [userId]);

    console.log(user);

    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/Product/GetProductsByOwnerId?id=${userId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProducts();
  }, [userId]);

  return (
    <div className='myProducts'>
      <div className='products-wrapper'>
      {products.map(product=>(
        <Product product={product} showButton={false} showButton2={true}/>
      ))}
      </div>
      </div>
  );
}

export default MyProducts;
