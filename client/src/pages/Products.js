import React, { useState } from 'react';
import '../styles/Products.css';
import Product from '../components/Product';

function Products() {
    const nizObjekata = [
        { ime: 'Frizider', tip: 'Bela tehnika' },
        { ime: 'Farmerice', tip: 'Odeca' },
        { ime: 'Stolica', tip: 'Namestaj' },
        { ime: 'Majica', tip: 'Odeca' }
    ];
    const [nameValue, setNameValue] = useState('');
    const [type, setType] = useState(null);

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };

    const handleTypeChange = (type) => {
        setType(type);
    };
    const filtriraniObjekti = nizObjekata.filter(objekat => {
        return objekat.ime.toLowerCase().includes(nameValue.toLowerCase());
    });

    const filteredProducts = type ? filtriraniObjekti.filter(objekat => objekat.tip === type) : filtriraniObjekti;

    const buttons = document.querySelectorAll('.tipDugme');
    const buttonShowAll = document.getElementById('prikaziSve');

    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if (button!==buttonShowAll){
                buttons.forEach(btn=>{
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            }
            else{
                buttons.forEach(btn=>{
                    btn.classList.remove('active');
                });
            }
        })
    })
    
    

    return (
        <div>
            <input type='text' placeholder='Search by name...' onChange={handleNameChange}></input>
            <br />
            <div className='tipFilterBar'>
                <button className='tipDugme' onClick={() => handleTypeChange('Bela tehnika')}>Bela tehnika</button>
                <button className='tipDugme' onClick={() => handleTypeChange('Namestaj')}>Namestaj</button>
                <button className='tipDugme' onClick={() => handleTypeChange('Odeca')}>Odeca</button>
                <button id='prikaziSve' className='tipDugme' onClick={() => handleTypeChange(null)}>Prikazi sve</button>
            </div>
            {filteredProducts.map((objekat, index) => (
                <Product key={index} objekat={objekat} />
            ))}
            <p>{filteredProducts.length}</p>
        </div>
    );
}

export default Products;
