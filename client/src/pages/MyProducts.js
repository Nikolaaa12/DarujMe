import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import '../styles/MyProducts.css';
import Cookies from 'js-cookie'

function MyProducts({userId}) {

  const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const response = await fetch('http://localhost:5238/api/User/GetUser', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors',
          });

          if (response.status !== 200) {
           // <Navigate to="/login" />;
            return;
          }

          const content = await response.json();
          //setUserId(content.id);
          console.log(content);
          setUser(content);
        };
        fetchUser();
    }, []);

    

    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/Product/GetProductsByOwnerId?id=${user.id}`);

        if (response.status !== 200) {
          // <Navigate to="/login" />;
           return;
         }

        const content = await response.data;
        console.log(content);
        setProducts(content);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div className='myProducts'>
      <div className='products-wrapper'>
      {products.map(product=>(
        <Product product={product} showButton={false} showButton2={true} sendBtn={true} userId={userId}/>
      ))}
      </div>
      </div>
  );
}

export default MyProducts;
