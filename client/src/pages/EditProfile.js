import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditProfile.css'; 

function EditProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    lastname: '',
    username: '',
    phoneNumber: '',
    city: '',
    address: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/User/GetUserById?id=${userId}`);
        if (!response.data) {
          setUser(null);
        } else {
          setUser(response.data);
          setEditedUser({
            name: response.data.name,
            lastname: response.data.lastname,
            username: response.data.username,
            phoneNumber: response.data.phoneNumber,
            city: response.data.city,
            address: response.data.address,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5238/api/User/UpdateUser?id=${userId}`, editedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5 form-container">
                  <h2 className="h2-responsive text-center mb-4">Edit Profile</h2>
                  <form onSubmit={handleProfileUpdate}>
                    <label htmlFor="name">Name</label>
                    <MDBInput
                      id="name"
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="lastname">Lastname</label>
                    <MDBInput
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={editedUser.lastname}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="username">Username</label>
                    <MDBInput
                      id="username"
                      type="username"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <MDBInput
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={editedUser.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="city">City</label>
                    <MDBInput
                      id="city"
                      type="text"
                      name="city"
                      value={editedUser.city}
                      onChange={handleInputChange}
                      required
                    />

                    <label htmlFor="address">Address</label>
                    <MDBInput
                      id="address"
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleInputChange}
                      required
                    />

                    <MDBBtn type="submit">Update Profile</MDBBtn>
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

export default EditProfile;
