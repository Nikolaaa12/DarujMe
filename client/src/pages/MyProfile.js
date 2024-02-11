import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import '../styles/MyProfile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Product from '../components/Product';
import noImage from '../resources/blank.jpg';
import { useParams } from 'react-router-dom';
function MyProfile() {

    const {userId} = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setPrducts] = useState(null);
    const [showReportDiv, setShowReportDiv] = useState(false);
    const [reportUserContent, setReportUserContent] = useState('');

    useEffect(() => {


        const fetchUser = async () => {
            try {

                const jwt = Cookies.get('jwt');

                // Create the request headers with the Authorization header containing the JWT token
                const config = {
                    headers: {
                        'Authorization': `Bearer ${jwt}` // Include the JWT token in the Authorization header
                    }
                };
                const response = await axios.get(`http://localhost:5238/api/User/GetUserById?id=${userId}`, config); // Adjust the URL according to your backend route

                // console.log(Cookies.get('jwt'))
                // const response = await fetch(`http://localhost:5238/api/User/GetUserById?id=${userId}`, {
                //   method: 'GET',
                //   headers: {
                //       'Content-Type': 'application/json',
                //       'Authorization': 'Bearer ' + Cookies.get('jwt')
                //   },
                //   credentials: 'include' 
                // });

                console.log(response)
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


    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`http://localhost:5238/api/Product/GetProductsByOwnerId?id=${userId}`); // Adjust the URL according to your backend route
           
            if (!response.data) {
              setPrducts(null);
            } else {
              setPrducts(response.data);
     
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchProducts();
    }, [products]);

useEffect(() => {
    const fetchUser = async () => {
        const response = await fetch(`http://localhost:5238/api/User/GetUser`, {
            headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt') },
            method: 'GET',
            credentials: 'include',
          }); 

          var data = await response.json()
          if (!data) {
              setCurrentUser(null);
          } else {
            setCurrentUser(data);
          }
    };
    fetchUser();
}, []);

const handleShowReportDiv = () => {
    setShowReportDiv(!showReportDiv);
};

const handleReportUser = async () => {
    
    const jwt = Cookies.get('jwt');

    if(!user || !currentUser){
        return;
    }

    const requestBody = JSON.stringify({
        Description: reportUserContent,
        ReportedUser: user,
        ReporterUserId: currentUser.id
    });

    const response = await fetch(`http://localhost:5238/api/UserReport/CreateUserReport`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    if (response.ok) {
        setShowReportDiv(false);
    }  

}

    return (
        <div style={{ backgroundColor:'#fafafa' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#1a1a1a', height: '200px' }}>
                                <div>

                                </div>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <MDBCardImage
                                        src={user && user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : noImage}
                                        alt="Generic placeholder image"
                                        className="mt-4 mb-2 img-thumbnail"
                                        fluid
                                        style={{ width: '150px', height:'150px', zIndex: '1' }}
                                    />
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">Name: {user ? user.name : 'Loading...'}</MDBTypography>
                                    <MDBTypography tag="h5">Lastname: {user ? user.lastname : 'Loading...'}</MDBTypography>

                                </div>
                                <idv className="my-profile-report-div">
                                    <label className='report-label' onClick={handleShowReportDiv}>Report</label>
                                </idv>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                
                            </div>
                            {showReportDiv && (<div className='my-profile-report-div-content'>
                                <label className='report-user-title'>Report user</label>
                                <textarea className="report-user-input" rows="3" placeholder='Report user...' type='text' required onChange={(e) => setReportUserContent(e.target.value)} />
                                <div className='report-user-button-div'>
                                    <label className='report-user-button' onClick={handleReportUser}>Report</label>
                                </div>
                            </div>)}
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">Contact info</p>
                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                        <MDBCardText className="font-italic mb-0">Email: {user ? user.email : 'Loading...'}</MDBCardText>
                                        <MDBCardText className="font-italic mb-0">Phone number: {user ? user.phoneNumber : 'Loading...'} </MDBCardText>
                                        <MDBCardText className="font-italic mb-0">City: {user ? user.city : 'Loading...'}</MDBCardText>
                                        <MDBCardText className="font-italic mb-0">Address: {user ? user.adress : 'Loading...'}</MDBCardText>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">Recently added</MDBCardText>
                                </div>
                                <MDBCardBody className="text-black p-4">
                                <div style={{display:'flex', flexDirection:'column'}} className="row" >
                                {products && products.map(product => (
                                 <div key={product.id} className="col-lg-4 mb-3">
                                  <Product product={product} showButton={false} showButton2={true} />
                                    </div>
                                  ))}
                                 </div>
                                </MDBCardBody>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default MyProfile;