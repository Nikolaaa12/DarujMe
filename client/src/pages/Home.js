import '../styles/Home.css';
import {useState} from 'react';

function Home({userId}){
    console.log(userId);

    return(
        <div className="home">
            <h1 className='title'>DarujMe</h1>
            {userId && ( <label>{userId}</label>
                // <img src={"data:image/jpeg;base64," + user.profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} />
            )}
        </div>
    )
}

export default Home;