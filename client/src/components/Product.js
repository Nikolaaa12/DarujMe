import React, { useState } from 'react';
import image from '../resources/12345.jpg';
import '../styles/Product.css';
import axios from 'axios';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noImage from '../resources/no-image.jpg';
import { useNavigate } from 'react-router-dom';

function Product({ product, showButton, userId, refreshProducts, showButton2, products, setProducts, sendBtn }) {

  const navigate=useNavigate();

  const [data, setData] = useState({
    ownerId: '',
    productId: '',
    customerId: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [reportProductContent, setReportProductContent] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
        product.available = false;
        refreshProducts();
      })
  }

  function isAvailable() {
    if (product && product.available === true) {
      return (<p style={{ color: 'green' }}>Available</p>)
    }
    else {
      return (<p style={{ color: 'red' }}>Reserved</p>)
    }
  }

  function isSent() {
    if (product && product.available === true) {
      return;
    }
    if (product && product.isSent === true) {
      return (<p style={{ color: 'green' }}>Sent</p>)
    }
    else {
      return (<p style={{ color: 'red' }}>Not sent</p>)
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




  const url = "http://localhost:5238/api/Product/ChangeState"

  async function Send() {
    const response = await axios.put(url, {
      id: product.id,
      isSent: product.isSent,
    })
    console.log('Odgovor od servera:', response.data);
  }

  const handleReportProduct = async () => {

    const reportData = {
      Description: reportProductContent,
      Product: product,
      IdUser: userId
    };

    const response = await axios.post(
      'http://localhost:5238/api/Report/CreateReport',
      reportData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('jwt')
        },
        withCredentials: true
      }
    );

    console.log(response);

    if (response.status === 200) {
      console.log(response)
      setModalOpen(false);
      setReportProductContent('');
    }
  };

  function handleRedirect(){
    navigate(`/pages/myprofile/${product.ownerId}`);
  }

  return (
    <div className='product-card'>

      {product && product.profilePicture ? (
        <img src={"data:image/jpeg;base64," + product.profilePicture} alt="Profile" />
      ) : (
        <img src={noImage} alt="No Image" />
      )}
      <button style={{ backgroundColor: '#1d1d1d', color: 'white' }} className='report-product-label' onClick={toggleModal}>Report</button>
      <div className="product-content">
        <h2>{product && product.name}</h2>
        <label style={{cursor:'pointer', textDecoration:'underline'}} onClick={()=>handleRedirect()}>See profile</label>
        <h2>{product && product.description}</h2>
        {isAvailable()}
        {isSent()}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {showButton && <button type="submit" onClick={(e) => submit(e)} className="download-button" style={{ backgroundColor: '#1d1d1d', color: 'white', borderRadius: '8px' }}>Reserve</button>}
          {product && !product.isSent && showButton2 && <button type="submit" onClick={handleDelete} className="download-button" style={{ backgroundColor: '#1d1d1d', color: 'white', borderRadius: '8px' }}>Delete</button>}
          {sendBtn && !product.available && !product.isSent && <button style={{ backgroundColor: '#1d1d1d', color: 'white', borderRadius: '8px' }} onClick={Send}>Send</button>}
        </div>
      </div>

      {modalOpen && (
        <div class="modal-dialog modal-dialog-scrollable">
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Report product</h5>
                  <button type="button" className="btn-close" onClick={toggleModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className='report-product-div'>
                    <textarea className="report-product-input" rows="3" placeholder='Report product...' type='text' required onChange={(e) => setReportProductContent(e.target.value)} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleReportProduct}>Report</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>

  );
}

export default Product;
