import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, FormControl, InputLabel, Input, FormHelperText,Card,CardContent,CardActions } from '@material-ui/core';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


async function postImage({ image, description, name ,quantity,price}) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);
  formData.append('name', name);
  formData.append('quantity', quantity);
  formData.append('price', price);


  const result = await axios.post('http://localhost:4000/seller/product', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      token:localStorage.getItem("adminToken"),
       
  },
  });
  return result.data;
}

function AddProduct() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [quantity,setQuantity]=useState('');
  const[price,setPrice]=useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const submit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select an image.');
      return;
    }
    setError('');

    try {
      const result = await postImage({ image: file, description, name,quantity,price });
      setImages([result.image, ...images]);
      setDescription('');
      setName('');
      setQuantity('');
      setPrice('');
      setFile(null);
      toast.success('Product added succesfully');
      navigate('/seller/dashboard')
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <>
    <div maxWidth="sm" style={{backgroundColor:'#080815',height:'100vh',width:'100vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Card variant="outlined" style={{marginTop:'15px',border:'1px solid black',maxWidth:'30vw',}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create a New Product
          </Typography>
          <form onSubmit={submit}>
            {/* ... (form fields) */}
            <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <TextField fullWidth label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} margin="normal" />
        <TextField fullWidth label="Price" value={price} onChange={(e) => setPrice(e.target.value)} margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="image">Image</InputLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={fileSelected}
                error={Boolean(error)}
                aria-describedby="image-helper-text"
              />
              {error && <FormHelperText id="image-helper-text">{error}</FormHelperText>}
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" style={{backgroundColor:'	#006400',justifyContent:'center',alignContent:'center'}}  onClick={submit}>
            Add
          </Button>
        </CardActions>
      </Card>

      <div style={{ marginTop: '20px' }}>
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Product ${index}`} style={{ maxWidth: '100%', marginBottom: '10px' }} />
        ))}
      </div>
    </div>
    </>
  );
}

export default AddProduct;
