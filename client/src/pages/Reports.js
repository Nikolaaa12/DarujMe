import '../styles/Reports.css';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Reports(){

  const [reports, setReports] = useState([]);

  useEffect(() => {  
    fetchData();
  }, []);

  const fetchData = async () => {
      const response = await fetch(`http://localhost:5238/api/Report/GetAllReports`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + Cookies.get('jwt')
          },
          credentials: 'include'
      });
      if (response.ok) {
          const data = await response.json();
          setReports(data);
      } 
  };

  const handleCheck = async (report) => {
    const response = await fetch(`http://localhost:5238/api/Report/DeleteReport?id=${report.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('jwt')
            },
            credentials: 'include'
        });
        console.log(response);
        if (response.ok) {
            setReports(prevReports => prevReports.filter(t => t.id !== report.id));
        } 
  };

  const handleDelete = async (report) => {

    const response = await fetch(`http://localhost:5238/api/Product/DeleteProduct?id=${report.product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('jwt')
            },
            credentials: 'include'
        });
        if (response.ok) {
            setReports(prevReports => prevReports.filter(t => t.id !== report.id));
            handleCheck(report);
        } 
  };

    return(
        <div className='reported-products-main'> 
          <div className='reported-products-content'>
            <div className='product-title-div'>
              <label className='product-type-title'>Reported products</label>
            </div>
            <div className='type-showing'>
                    <div className='type-showing-content'>
                        {reports.map((report, index) => (
                            <div key={index} className='report-item'>
                              <div className='reports-img-div'>
                                <img className='reports-img' src={"data:image/jpeg;base64," + report.product.profilePicture} alt="Profile" />
                              </div>
                              <div className='reports-product-name'>
                                <label>{report.product.name}</label>
                              </div>
                              <div className='reports-product-description'>
                                <label>{report.description}</label>
                              </div>
                              <div className='reports-buttons'>
                                <label className='button-report' onClick={() => handleCheck(report)}><i class="bi bi-check-lg"></i></label>
                                <label className='button-report' onClick={() => handleDelete(report)}><i class="bi bi-trash3-fill"></i></label>
                              </div>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
        </div>
    )
}

export default Reports;