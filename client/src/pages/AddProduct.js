import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function AddProduct({userId}) {

  const [productTypes, setProductTypes] = useState([]);
  const [data, setData] = useState({
    name:'',
    ownerId:'',
    description:'',
    productTypeId:'1'
  });
  const [profilePicture, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureFile(file || null);

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        setProfilePicturePreview(null);
    }
};

const clearProfilePicture = () => {
  setProfilePictureFile(null);
  setProfilePicturePreview(null);
};

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await axios.get(`http://localhost:5238/api/ProductType/GetAllProductType`);
        setProductTypes(response.data);
      } catch (error) {
        console.error('Error fetching product types:', error);
      }
    };

    fetchProductTypes();
  }, []);

  const handleInputChange = (e) => {
    var newdata = { ...data };
        newdata.ownerId=userId;
        newdata[e.target.id] = e.target.value; // Use square brackets for assignment
        setData(newdata);
        console.log(newdata);
  };

  const url='http://localhost:5238/api/Product/CreateProduct';

  
  function submit(e){
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('name', data.name);
    formData.append('ownerId', userId);
    formData.append('description', data.description);
    formData.append('productTypeId', data.productTypeId);
    
    console.log(data.name)
    axios.post(url, formData)
    .then(res=>{
        console.log(res.data)
    })

    // console.log(data.name)
    // axios.post(url,{
    //     ...data
    // })
    // .then(res=>{
    //     console.log(res.data)
    // })
}



  return (
    <div className="gradient-custom-2">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5 form-container">
                  <h2 className="h2-responsive text-center mb-4">Add product</h2>
                  <form onSubmit={submit}>
                    <div style={{ marginBottom: '2rem' }}>

                    <div className="register-image-div">
                      {profilePicturePreview ? (
                        <img src={profilePicturePreview} alt="Profile Preview" className="profile-preview" onClick={clearProfilePicture}/>) : 
                        (<>
                            <label htmlFor="profile-pictur" className="profile-picture-label"><i className="bi bi-camera-fill"></i></label>
                            <input type="file" id="profile-picture" onChange={handleFileChange} accept="image/*" className="profile-picture-input" ref={fileInputRef}/>
                          </>
                        )
                      }
                    </div>
                      <label>Product name</label>
                      <MDBInput
                        onChange={(e)=>handleInputChange(e)}
                        value={data.name}
                        type="text"
                        id='name'
                       
                      />
                      <label>Description</label>
                      <MDBInput
                        onChange={(e)=>handleInputChange(e)}
                        value={data.description}
                        type="text"
                        id='description'
                      />
                      <select onChange={(e) => setData({ ...data, productTypeId: e.target.value })}>
                        {productTypes.map(type=>(
                          <option value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                    <MDBBtn type="submit" submit='true' >Add</MDBBtn>
                  </form>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default AddProduct;