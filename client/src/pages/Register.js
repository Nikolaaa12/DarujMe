
import { Link } from 'react-router-dom';
import '../styles/Register.css';
import { useState, useRef } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';


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
    phoneNumber: '',
    adress: '',
  });

  const [profilePicture, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureFile(file || null);

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        setProfilePicturePreview(null);
    }
};

const clearProfilePicture = () => {
  setProfilePictureFile(null);
  setProfilePicturePreview(null);
};

  const navigate = useNavigate();
  const url = 'http://localhost:5238/api/User/Register';

  const submit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('name', data.name);
    formData.append('lastname', data.lastname);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('city', data.city);
    formData.append('password', data.password);
    formData.append('repeatedPassword', data.repeatedPassword);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('adress', data.adress);

    Axios.post(url, formData)
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

    setData({ ...data, [e.target.id]: e.target.value });
    console.log(data);
  };



  return (
    <>
      <form onSubmit={submit} className="form-signin">
        <div className='register'>
          <MDBContainer fluid className="p-4 background-radial-gradient overflow-hidden">
            <MDBRow>
              <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">
                <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: '3d3d3d' }}>
                  CREATE AN ACCOUNT NOW!</h1>
              </MDBCol>
              <MDBCol md="6" className="position-relative">
                <MDBCard style={{ backgroundColor: 'grey', border: '2px solid rgba(255,255,255,0.3)' }} className="my-5 bg-glass">
                  <MDBCardBody className="p-5">
                    <div className="register-image-div">
                      {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Profile Preview" className="profile-preview" onClick={clearProfilePicture}/>) : 
                        (<>
                            <label htmlFor="profile-pictur" className="profile-picture-label"><i className="bi bi-camera-fill"></i></label>
                            <input type="file" id="profile-picture" onChange={handleFileChange} accept="image/*" className="profile-picture-input" ref={fileInputRef}/>
                          </>
                        )
                      }
                    </div>
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

                      <button submit="true" style={{ border: 'none', backgroundColor: '#3d3d3d', color: 'white', width: '100%' }} type="submit" className="signInButton" >
                        Sign up
                      </button>
                      <Link to='/pages/signIn'><MDBCardText style={{ color: 'white', marginTop: '1rem' }}>Already have an account? Click here to login!</MDBCardText></Link>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default Register;