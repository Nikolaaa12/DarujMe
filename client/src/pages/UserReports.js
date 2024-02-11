import '../styles/UserReports.css';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import axios from 'axios';
import noImage from '../resources/no-image.jpg';

function UserReports(){

  const [reports, setReports] = useState([]);

  useEffect(() => {  
    fetchData();
  }, []);

  const fetchData = async () => {
      const response = await fetch(`http://localhost:5238/api/UserReport/GetAllUserReports`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + Cookies.get('jwt')
          },
          credentials: 'include'
      });
      if (response.ok) {
          const data = await response.json();
          console.log(data)
          setReports(data);
      } 
  };

   const handleCheck = async (report) => {
    const response = await fetch(`http://localhost:5238/api/UserReport/DeleteUserReport?id=${report.id}`, {
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

    const response = await fetch(`http://localhost:5238/api/User/DeleteUser?id=${report.reportedUser.id}`, {
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
          <div className='reported-products-main'> 
            <div className='reported-products-content'>
                <div className='product-title-div'>
                <label className='product-type-title'>Reported users</label>
                </div>
                <div className='type-showing'>
                        <div className='type-showing-content'>
                            {reports.map((report, index) => (
                                <div key={index} className='user-report-item'>
                                    <div className='user-reports-img-div'>
                                        <img className='user-reports-img' src={report.reportedUser.profilePicture ? "data:image/jpeg;base64," + report.reportedUser.profilePicture : noImage} alt="Profile" />
                                    </div>
                                    <div className='reports-user-name-description'>
                                        <label className='name-title'>{report.reportedUser.name}</label>
                                        <label className='description-text'>{report.description}</label>
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
        </div>
    )
}

export default UserReports;