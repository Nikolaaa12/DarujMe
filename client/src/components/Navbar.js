import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

function CustomNavbar() {

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
                            <Nav.Link>Products</Nav.Link>
                            <Nav.Link>About us</Nav.Link>
                        </Nav>
                        
                        <Nav>
                            <Nav.Link href="/pages/SignIn"><button className='navbarBtn'>Sign in</button></Nav.Link>
                            <NavDropdown style={{display: 'flex', alignItems: 'center'}}  title="Profile" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="/pages/myprofile">MyProfile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">MyProducts</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Edit profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default CustomNavbar;