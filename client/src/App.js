import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import About from './pages/About';
import SignIn from './pages/Sign-in';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Reports from './pages/Reports';
import UserReports from './pages/UserReports';
import { useEffect } from 'react';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import MyProducts from './pages/MyProducts';
import Edit from './pages/EditProfile';
import ProductType from './pages/ProductType';
import MyReservations from './pages/MyReservations';


function App() {
  const [userId, setUserId] = useState(-1);
  const [user, setUser] = useState(null);
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
          setUser(content);
          
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
    <div className="App">
      <BrowserRouter>
        <Navbar userId={userId} setUserId={setUserId}/>
        <main className='main'>
          <Routes>
            <Route path='/' element={<Products userId={userId}/>}></Route>
            <Route path='/pages/about' element={<About />}></Route>
            <Route path='/ProductType' element={<ProductType />}></Route>
            <Route path='/pages/SignIn' element={<SignIn setUserId={setUserId}/>}></Route>
            <Route path='/pages/register' element={<Register/>}></Route>
            <Route path='/pages/myprofile/:userId' element={<MyProfile />}></Route>
            <Route path='/pages/reports' element={<Reports/>}></Route>
            <Route path='/pages/userReports' element={<UserReports/>}></Route>
            <Route path='/pages/addProduct' element={<AddProduct userId={userId}/>}></Route>
            <Route path='/pages/myproducts' element={<MyProducts userId={userId}/>}></Route>
            <Route path='/pages/editprofile' element={<Edit userId={userId}/>}></Route>
            <Route path='/pages/myreservations' element={<MyReservations userId={userId}/>}></Route>
          </Routes>
        </main>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
