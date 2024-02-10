import '../styles/Sign-in.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignIn(props) {
  const { setUserId } = props;
  const navigate = useNavigate();
  const url = "http://localhost:5238/api/User/Login";

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        mode: "cors"
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText, {
          className: 'custom-toast',
          bodyClassName: 'custom-toast-body',
          autoClose: 3000,
        });
      } else {
        const userData = await response.json();
        await setUserId(userData.id);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message, {
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        autoClose: 3000,
      });
    }
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }


  return (
    <>
      <form onSubmit={submit} className='container1'>
        <div className='signIn'>
          <div className='signInWrapper'>
            <header>Sign in</header>
            <div className='signInInputs'>
              <input onChange={handle} id="email" value={data.email} placeholder='&#x2709; Enter your email' type='text' required></input>
              <input onChange={handle} id="password" value={data.password} placeholder='&#x1F512; Password' type='password' required></input>
            </div>
            <div className='forgot-password'>
              <p>Forgot your password? <a href=''>Click here!</a></p>

            </div>
            <button className='signInButton' type='submit' submit='true'>Sign in</button>
            <div className='registerNow'>
              <p style={{ textAlign: 'center' }}>Don't have an account yet?</p>
              <Link to='/pages/register'><p>Click here to register now for free!</p></Link>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default SignIn;