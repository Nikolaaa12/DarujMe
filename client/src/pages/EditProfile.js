import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import '../styles/EditProfile.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

function Edit({userId}) {

  const url='http://localhost:5238/api/User/EditUser';

  const [user, setUser] = useState(null);

  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePicture, setProfilePictureFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(userId !== -1)
        {
          const response = await fetch(`http://localhost:5238/api/User/GetUserById?id=${userId}`, {
              headers:{'Authorization': 'Bearer ' + Cookies.get('jwt')},
              method: 'GET',
              credentials: 'include',
            }); // Adjust the URL according to your backend route
        
          if (!response.data) {
            setUser(null);
          } else {
            setUser(response.data);
            if(response.data.profilePicture)
              setProfilePicturePreview("data:image/jpeg;base64," +response.data.profilePicture);
          }
        }
        
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
}, [userId]);

function submit(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('id', user.id);
  formData.append('name', user.name);
  formData.append('lastname', user.lastname);
  formData.append('phoneNumber', user.phoneNumber);
  formData.append('adress', user.adress);
  formData.append('city', user.city);
  // Append the profile picture if it's not null
  if (profilePicture) {
    formData.append('profilePicture', profilePicture);
  }
  
  // Make a POST request to the server with FormData
  axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + Cookies.get('jwt') // Set content type to multipart/form-data
    }
  })

  // axios.put(url, {
  //   id: user.id,
  //   name: user.name,
  //   lastname: user.lastname,
  //   phoneNumber: user.phoneNumber,
  //   adress: user.adress,
  //   city: user.city
  // })
}

const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  setProfilePictureFile(file || null);

  if (file) {
      setChangeProfilePicture(true);
      const reader = new FileReader();
      reader.onloadend = () => {
          setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
  } else {
      setProfilePicturePreview(null);
      setChangeProfilePicture(false);
  }
};

const clearProfilePicture = () => {
  setProfilePictureFile(null);
  setProfilePicturePreview(null);
  setChangeProfilePicture(true);
}

  
  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5 form-container">
                  <h2 className="h2-responsive text-center mb-4">Edit Profile</h2>
                  <form onSubmit={submit}>
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
                    <label htmlFor="name">Name</label>
                    <MDBInput
                      id="name"
                      type="text"
                      name="name"
                      value={user&& user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />

                    <label htmlFor="lastname">Lastname</label>
                    <MDBInput
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={user&& user.lastname}
                      onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <MDBInput
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={user&& user.phoneNumber}
                      onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                    />

                    <label htmlFor="city">City</label>
                    <MDBInput
                      id="city"
                      type="text"
                      name="city"
                      value={user&& user.city}
                      onChange={(e) => setUser({ ...user, city: e.target.value })}
                    />

                    <label htmlFor="address">Address</label>
                    <MDBInput
                      id="address"
                      type="text"
                      name="address"
                      value={user&& user.adress}
                      onChange={(e) => setUser({ ...user, adress: e.target.value })}
                    />

                    <MDBBtn type="submit" submit='true' >Update Profile</MDBBtn>
                  </form>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

  


export default Edit;
