
import { Link } from 'react-router-dom';
import '../styles/Register.css';
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

function Register() {
  return (
    <>
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
                      <MDBInput wrapperClass="mb-4" placeholder='First name' type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="Last name" type="text" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="Username" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="City" type="text" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="Address" type="text" required />
                    </MDBCol>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="Zip/Postal code" type="number" required />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput wrapperClass="mb-4" placeholder="PhoneNumber" type="number" required />
                    </MDBCol>
                  
                  </MDBRow>
                  <div className="kont">
                    <MDBInput wrapperClass="mb-4" placeholder="Password" type="password" required />
                    <MDBInput wrapperClass="mb-4" placeholder="Repeat Password" type="password" required />
                    
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
    </>
  )
}

export default Register;