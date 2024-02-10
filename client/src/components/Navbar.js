import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'



function CustomNavbar({userId, setUserId}) {
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
            else{}
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
              setUserId(-1);
              navigate('/');
            }
          })
          .catch(error => {
            console.error('Logout error:', error);
          });
      };

      const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`http://localhost:5238/api/User/GetUserById?id=${userId}`, {
                headers:{'Authorization': 'Bearer ' + Cookies.get('jwt')},
                method: 'GET',
                credentials: 'include',
              }); // Adjust the URL according to your backend route

            // const response = await fetch(`http://localhost:5238/api/User/GetUserById?id=${userId}`);
            
            if (!response.data) {
              setUser(null);
            } else {
              console.log(response.data)
              setUser(response.data);
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchUser();
    }, [userId]);

    return (
        <>
            <Navbar id='myNavbar' fixed="top" collapseOnSelect expand="lg" bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">DarujMe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {user && user.admin && (
                            <>
                            <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="/ProductType">Product type</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/pages/reports">Reported products</NavDropdown.Item>
                                <NavDropdown.Item href="/pages/reports">Reported users</NavDropdown.Item>
                            </NavDropdown></>)}
                        </Nav>

                        <Nav className="me-auto">
                            <Nav.Link href="/pages/addProduct"><button className='navbarBtn'>Add product</button></Nav.Link>
                            <Nav.Link href='/pages/products' style={{display: 'flex', alignItems: 'center'}}>Products</Nav.Link>
                            <Nav.Link href='/pages/about'style={{display: 'flex', alignItems: 'center'}}>About us</Nav.Link>
                        </Nav>
                        
                        <Nav>
                          {userId ==-1 &&(
                            <Nav.Link href="/pages/SignIn"><button className='navbarBtn'>Sign in</button></Nav.Link>)}
                            <NavDropdown style={{display: 'flex', alignItems: 'center'}}  title="Profile" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href={`/pages/myprofile/${userId}`}>My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/pages/myproducts">My Products</NavDropdown.Item>
                                <NavDropdown.Item href="/pages/editprofile">Edit profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/pages/myreservations">My Reservations</NavDropdown.Item>
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