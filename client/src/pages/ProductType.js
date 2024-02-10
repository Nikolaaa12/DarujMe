import '../styles/ProductType.css';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

function ProductType(){

    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState('');

    useEffect(() => {  
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5238/api/ProductType/GetAllProductType`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('jwt')
            },
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setTypes(data);
        } 
    };

    const handleDelete = async (type) => {
        const response = await fetch(`http://localhost:5238/api/ProductType/DeleteProductType?id=${type.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('jwt')
            },
            credentials: 'include'
        });
        if (response.ok) {
            setTypes(prevTypes => prevTypes.filter(t => t.id !== type.id));
        }   
    };

    const handleCreate = async () => {
        const response = await fetch(`http://localhost:5238/api/ProductType/CreateProductType?name=${newType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('jwt')
            },
            credentials: 'include'
        });
        if (response.ok) {
            fetchData();
            setNewType('');
        }   
    };

    return(
        <div className="product-type-main">
            <div className="type-content">
                <label className="product-type-title">Product types</label>
                <div className="product-type-add-type">
                    <div className='type-input-add'>
                        <div className='input-add'>
                            <input className='type-input' type="text" value={newType} onChange={(e) => setNewType(e.target.value)} placeholder='Product type' required/>
                            <label className='type-add' onClick={handleCreate}>Create</label>
                        </div>
                    </div>
                </div>
                <div className='type-showing'>
                    <div className='type-showing-content'>
                        {types.map((type, index) => (
                            <div key={index} className='type-item'>
                                <label>{type.name}</label>
                                <label className='type-trash' onClick={() => handleDelete(type)}><i class="bi bi-trash3-fill"></i></label>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default ProductType;