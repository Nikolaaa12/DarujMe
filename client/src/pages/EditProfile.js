import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import '../styles/EditProfile.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function Edit({userId}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`http://localhost:5238/api/User/GetUserById?id=${userId}`); // Adjust the URL according to your backend route
            
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

  


  
  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5 form-container">
                  <h2 className="h2-responsive text-center mb-4">Edit Profile</h2>
                  <form>
                    <label htmlFor="name">Name</label>
                    <MDBInput
                      id="name"
                      type="text"
                      name="name"
                      value={user&& user.name}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />

                    <label htmlFor="lastname">Lastname</label>
                    <MDBInput
                      id="lastname"
                      type="text"
                      name="lastname"
                      value={user&& user.lastname}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <MDBInput
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      value={user&& user.phoneNumber}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />

                    <label htmlFor="city">City</label>
                    <MDBInput
                      id="city"
                      type="text"
                      name="city"
                      value={user&& user.city}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />

                    <label htmlFor="address">Address</label>
                    <MDBInput
                      id="address"
                      type="text"
                      name="address"
                      value={user&& user.address}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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

  


export default Edit;
