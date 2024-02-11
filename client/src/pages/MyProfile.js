import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import '../styles/MyProfile.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
function MyProfile() {

    const {userId} = useParams();
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
        //const response = await axios.get(`http://localhost:5238/api/Product/GetProductsByOwnerId?id=${userId}`); // Adjust the URL according to your backend route

        const response = await fetch(`https://localhost:5238/api/Product/GetProductsByOwnerId?id=${userId}`, {
            headers:{'Authorization': 'Bearer ' + Cookies.get('jwt')},
            method: 'GET',
            credentials: 'include',
        });
        
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

const handleShowReportDiv = () => {
    setShowReportDiv(!showReportDiv);
};

const handleReportUser = async () => {
    setShowReportDiv(false);

    const response = await fetch(`https://localhost:5238/api/UserReport/CreateUserReport?id=${userId}`, {
        headers:{'Authorization': 'Bearer ' + Cookies.get('jwt')},
        method: 'GET',
        credentials: 'include',
    });
    
    if (!response.data) {
      setPrducts(null);
    } else {
      setPrducts(response.data);

    }

}

    return (
        <div className="gradient-custom-2" style={{ backgroundImage: 'linear-gradient(to top, rgba(25, 25, 112, 1), rgba(0, 150, 255, 0.6), rgba(25, 25, 112, 1))' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: 'rgba(25, 25, 112, 1)', height: '200px' }}>
                                <div>

                                </div>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
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
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">{user ? user.products.length: 'Loading...'}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Products added</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            {showReportDiv && (<div className='my-profile-report-div-content'>
                                <label className='report-user-title'>Report user</label>
                                <textarea  className="report-user-input" rows="3" placeholder='Report user...' type='text' required onChange={(e) => setReportUserContent(e.target.value)}/>
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
                                <MDBRow>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="g-2">
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default MyProfile;