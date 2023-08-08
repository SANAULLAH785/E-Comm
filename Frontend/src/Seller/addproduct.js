import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';


async function postImage({ image, description, name }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);
  formData.append('name', name);

  const result = await axios.post('/seller/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

function AddProduct() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select an image.');
      return;
    }
    setError('');

    try {
      const result = await postImage({ image: file, description, name });
      setImages([result.image, ...images]);
      setDescription('');
      setName('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <Container className="Save">
      <Typography variant="h4" gutterBottom>
        Create a New Product
      </Typography>
      <form onSubmit={submit}>
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
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Product ${index}`} />
      ))}
    </Container>
  );
}

export default AddProduct;
