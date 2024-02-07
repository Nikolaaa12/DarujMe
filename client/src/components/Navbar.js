import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';


function CustomNavbar() {
    var navigate = useNavigate();
    const logout = () => {
        fetch('http://localhost:5238/api/User/Logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          mode: 'cors',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(() => {/*
            setLogovanikorisnik(-1);
            setUser({
              email: '',
              username: '',
              name: '',
              admin: false,
              lastName: '',
              city: '',
              description: '',
              pricePerHour: 0,
            });*/
            const currentPath = window.location.pathname;
    
            if (currentPath === '/') {
              window.location.reload();
            } else {
              navigate('/');
            }
          })
          .catch(error => {
            console.error('Logout error:', error);
          });
      };
    return (
        <>
            <Navbar id='myNavbar' fixed="top" collapseOnSelect expand="lg" bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">DarujMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/pages/reports">Reports</Nav.Link>
                            <NavDropdown title="Delete" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">User</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Advertisement</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        <Nav className="me-auto">
                            <Nav.Link href="/pages/addProduct"><button className='navbarBtn'>Add product</button></Nav.Link>
                            <Nav.Link href='/pages/products' style={{display: 'flex', alignItems: 'center'}}>Products</Nav.Link>
                            <Nav.Link href='/pages/about'style={{display: 'flex', alignItems: 'center'}}>About us</Nav.Link>
                        </Nav>
                        
                        <Nav>
                            <Nav.Link href="/pages/SignIn"><button className='navbarBtn'>Sign in</button></Nav.Link>
                            <NavDropdown style={{display: 'flex', alignItems: 'center'}}  title="Profile" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="/pages/myprofile">MyProfile</NavDropdown.Item>
                                <NavDropdown.Item href="/pages/myproducts">MyProducts</NavDropdown.Item>
                                <NavDropdown.Item href="pages/editprofile">Edit profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default CustomNavbar;