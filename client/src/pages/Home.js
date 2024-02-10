import '../styles/Home.css';
import {useState} from 'react';

function Home({user}){
    console.log(user);

    return(
        <div className="home">
            <h1 className='title'>DarujMe</h1>
            {user && (
                <img src={"data:image/jpeg;base64," + user} alt="Profile" style={{ width: '100px', height: '100px' }} />
            )}
        </div>
    )
}

export default Home;