import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/Sign-in';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Reports from './pages/Reports';
import { useEffect } from 'react';

function App() {

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
          <Route path='/pages/SignIn' element={<SignIn />}></Route>
          <Route path='/pages/register' element={<Register/>}></Route>
          <Route path='/pages/myprofile' element={<MyProfile/>}></Route>
          <Route path='/pages/reports' element={<Reports/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
