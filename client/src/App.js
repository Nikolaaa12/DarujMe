import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/Sign-in';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Reports from './pages/Reports';
import { useEffect } from 'react';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import MyProducts from './pages/MyProducts';
import EditProfile from './pages/EditProfile';

function App() {
  const [userId, setUserId] = useState(-1);
  //const Navigate = useNavigate();

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:5238/api/User/GetUser', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            mode: 'cors',
          });

          if (response.status !== 200) {
           // <Navigate to="/login" />;
            return;
          }

          const content = await response.json();
          setUserId(content.id);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    )();
  }, [userId]);

  useEffect(() => {
    // Pronađite navbar element po id-u
    const navbar = document.getElementById('myNavbar');
    if (navbar) {
      // Dobijte visinu navbara
      const navbarHeight = navbar.clientHeight;
      // Postavite padding-top na body element
      document.body.style.paddingTop = (navbarHeight) + 'px';
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/pages/about' element={<About />}></Route>
          <Route path='/pages/SignIn' element={<SignIn setUserId={setUserId}/>}></Route>
          <Route path='/pages/register' element={<Register/>}></Route>
          <Route path='/pages/myprofile' element={<MyProfile userId={userId}/>}></Route>
          <Route path='/pages/reports' element={<Reports/>}></Route>
          <Route path='/pages/addProduct' element={<AddProduct/>}></Route>
          <Route path='/pages/products' element={<Products/>}></Route>
          <Route path='/pages/myproducts' element={<MyProducts/>}></Route>
          <Route path='/pages/editprofile' element={<EditProfile/>}></Route>
        </Routes>
      </BrowserRouter>
      <div>{userId}</div>
    </>
  );
}

export default App;
