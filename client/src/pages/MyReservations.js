
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyReservations({ userId }) {
    const [reservations, setReservations] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:5238/api/Reservation/GetReservationsByCustomerId?id=${userId}`, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                  },
                  credentials: 'include',
                  mode: 'cors',
              });
  
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
  
              const reservationsData = await response.json();
              setReservations(reservationsData);
              console.log(reservations);
  
              const productData = await Promise.all(
                  reservationsData.map(async (reservation) => {
                      const productResponse = await fetch(`http://localhost:5238/api/Product/GetProductById?id=${reservation.productId}`, {
                          headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                          },
                          credentials: 'include',
                          mode: 'cors',
                      });
  
                      if (!productResponse.ok) {
                          throw new Error(`HTTP error! Status: ${productResponse.status}`);
                      }
  
                      return await productResponse.json();
                  })
              );
  
              setProducts(productData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, [userId]);

  console.log(products);

    return (
      <div>
      <h1>My Reservations</h1>
      <ul>
          {reservations.map((reservation, index) => (
              <li key={index}>
                  <p>Reservation ID: {reservation.id}</p>
                  <p>{products[index] && products[index].name}</p>
              </li>
          ))}
      </ul>
  </div>
    );
}

export default MyReservations;
