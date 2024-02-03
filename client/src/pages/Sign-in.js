import '../styles/Sign-in.css';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


function SignIn() {


    return (
        <>
            <div className='signIn'>
                <div className='signInWrapper'>
                    <header>Sign in</header>
                    <form>
                        <div className='signInInputs'>
                            <input placeholder='&#x2709; Enter your email' type='text' required></input>
                            <input placeholder='&#x1F512; Password' type='password' required></input>
                        </div>
                        <div className='forgot-password'>
                            <p>Forgot your password? <a href=''>Click here!</a></p>

                        </div>
                        <button className='signInButton' type='submit' submit='true'>Sign in</button>
                    </form>
                    <div className='registerNow'>
                        <p style={{textAlign: 'center'}}>Don't have an account yet?</p>
                        <Link to='/pages/register'><p>Click here to register now for free!</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;