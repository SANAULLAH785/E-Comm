import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, AppBar, Toolbar, IconButton, Grid,Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { toast } from 'react-hot-toast';
import NavBar from '../NavBar/navbar';


const HomePage = ({setCart,cart}) => {
    const [products, setProducts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    // const [cart, setCart] = useState([]); // State to store cart items
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setLoggedIn(false);
        toast.success('Logged Out Successfully');
        navigate('/');
    };
    const handleAddToCart = (product) => {
        console.log('Adding to cart:', product); // Add this line
        setCart((prevCart) => [...prevCart, product]);
        toast.success('Product added to cart');
      };
    //   useEffect(() => {
    //     console.log(cart, 'cart of home ');
    //   }, [cart]);  
    async function getProducts() {
        const response = await axios.get('http://localhost:4000/products');
        
        return response.data;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await getProducts();
            setProducts(productData);
        };
        fetchProducts();
    }, []);

    const productRows = [];
    for (let i = 0; i < products.length; i += 4) {
        const productRow = products.slice(i, i + 4);
        productRows.push(productRow);
    }
 
    return  (
        <>
        <Container maxWidth="xl">
            <NavBar loggedIn={loggedIn} onLogout={handleLogout} cartCount={cart.length} />

            <div style={{marginTop:'5px'}}>
                {productRows.map((productRow, rowIndex) => (
                    <Grid container spacing={2} key={rowIndex}>
                        {productRow.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <div sx={{ my: 2, p: 1, border: '1px solid black' }} style={{border:'1px solid black',padding:'1px'}}>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        {product.product_name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Quantity: {product.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Price: ${product.price}
                                    </Typography>
                                    <img style={{ width: '100%', height: '200px', objectFit: 'contain', objectPosition: 'center' }} src={product.image_key} alt={product.product_name} />
                                    <Button variant="contained" style={{backgroundColor:'#4caf50'}}  onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                   
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </div>
        </Container>
        </>

    );
};

export default HomePage;
