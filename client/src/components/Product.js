import React, { useState } from 'react';
import image from '../resources/12345.jpg';
import '../styles/Product.css';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product({product, showButton, userId, refreshProducts,showButton2, products, setProducts}){

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
        refreshProducts();
      })
  }

  function isAvailable(){
    if (product.available===true){
      return(<p style={{color:'green'}}>Available</p>)
    }
    else{
      return(<p style={{color:'red'}}>Reserved</p>)
    }
  }

  function handleDelete() {
    const productId = product.id;

    const isConfirmed = window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?');

    if (!isConfirmed) {
      return;
    }

    axios
      .delete(`http://localhost:5238/api/Product/DeleteProduct?id=${productId}`, {
        headers: {
          'accept': '*/*',
        },
      })
      .then((res) => {
        toast.success('Proizvod uspešno obrisan!', {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });

        console.log('Proizvod obrisan:', productId);
        window.location.reload();
      })
      .catch((error) => {
        toast.error('Greška pri brisanju proizvoda. Molimo pokušajte ponovo.', {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });

        console.error('Greška pri brisanju proizvoda:', error);
      });
  }

  return (
    <div className='product-card'>
      <img src={image} alt="Product" />
      {/* <img src={"data:image/jpeg;base64," + product.profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} /> */}
      <div className="product-content">
        <h2>{product.name}</h2>
        <h2>{product.description}</h2>
        {isAvailable()}
        {showButton && <button type="submit" onClick={(e) => submit(e)} className="download-button">Preuzmi</button>}
        {showButton2 && <button type="submit" onClick={handleDelete} className="download-button">Obrisi</button>}
      </div>
    </div>
  );
}

export default Product;
