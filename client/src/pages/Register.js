
import { Link } from 'react-router-dom';
import '../styles/Register.css';
import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';


function Register() {
  const [data, setData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    city: '',
    password: '',
    picture: '',
    repeatedPassword: '',
    phoneNumber:'',
    adress:'',
  });

  const navigate = useNavigate();
  const url = 'http://localhost:5238/api/User/Register';

  const submit = (e) => {
    e.preventDefault();
    Axios.post(url, {
      ...data,
    })
      .then((res) => {
        console.log(res.data);
        navigate('/pages/SignIn');
      })
      .catch((error) => {
        toast.error(error.response.data, {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });
      });
  };
  const handleInputChange = (e) => {

    setData({ ...data, [e.target.id]: e.target.value  });
    console.log (data);
  };



  return (
    <>
    <form onSubmit={submit} className="form-signin">
    <div className='register'>
      <form className="form-signin">
        <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
          <MDBRow>
            <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'white'}}>
                CREATE AN ACCOUNT NOW!</h1>
            </MDBCol>
            <MDBCol  md="6" className="position-relative">
              <MDBCard style={{backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.3)'}} className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="name" value={data.name} wrapperClass="mb-4" placeholder='First name' type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="lastname" value={data.lastname} wrapperClass="mb-4" placeholder="Last name" type="text" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="username" value={data.username} wrapperClass="mb-4" placeholder="Username" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="city" value={data.city} wrapperClass="mb-4" placeholder="City" type="text" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="adress" value={data.adress} wrapperClass="mb-4" placeholder="Address" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="email" value={data.email} wrapperClass="mb-4" placeholder="E-mail" type="email" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput onChange={handleInputChange} id="phoneNumber" value={data.phoneNumber} wrapperClass="mb-4" placeholder="PhoneNumber" type="number" required />
                    </MDBCol>
                  
                  </MDBRow>
                  <div className="kont">
                    <MDBInput onChange={handleInputChange} id="password" value={data.password} wrapperClass="mb-4" placeholder="Password" type="password" required />
                    <MDBInput onChange={handleInputChange} id="repeatedPassword" value={data.repeatedPassword} wrapperClass="mb-4" placeholder="Repeat Password" type="password" required />
                    
                    <button submit="true" style={{  border: 'none', backgroundColor: 'rgba(0, 150, 255, 0.8)', color: 'white', width: '100%' }} type="submit" className="signInButton" >
                      Sign up
                    </button>
                    <Link to='/pages/signIn'><MDBCardText style={{color: 'white', marginTop: '1rem'}}>Already have an account? Click here to login!</MDBCardText></Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
      </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default Register;