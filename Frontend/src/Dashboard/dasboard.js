import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, AppBar, Toolbar, IconButton, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { ROUTES } from '../utils/routes';
import AuthRoutes from '../routes/Auth';
import "./dashboard.css";

const Dashboard = ({ onJoinClick }) => {
    const [products, setProducts] = useState([]);
    const [showAuthRoutes, setShowAuthRoutes] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const handleJoinClick = () => {
        // onJoinClick();
        navigate(ROUTES.AUTH_ROUTES.login);
    };

    async function getProducts() {
        const response = await axios.get('http://localhost:4000/purchaser/products');
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
    for (let i = 0; i < products.length; i += 5) {
        const productRow = products.slice(i, i + 5);
        productRows.push(productRow);
    }

    return (
        <Container maxWidth="lg">
            <AppBar position="static" sx={{ width: '100%', ml: 0, mr: 0 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-commerce Website
                    </Typography>
                  
                    <Button color="inherit" component={Link} to={ROUTES.ABOUT}>About</Button>
                    <Button color="inherit" component={Link} to={ROUTES.SERVICES}>Services</Button>
                    <Button color="inherit" component={Link} to={ROUTES.CONTACT}>Contact Us</Button>
                    {!showAuthRoutes ? (
                        <Button color="inherit" onClick={handleJoinClick}>Join</Button>
                    ) : null}
                </Toolbar>
            </AppBar>
            <div>
                {productRows.map((productRow, rowIndex) => (
                    <Grid container spacing={2} key={rowIndex}>
                        {productRow.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <div sx={{ my: 2, p: 2, border: '1px solid #ccc' }}>
                                    <Typography variant="h5" component="h3" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {product.description}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </div>
        </Container>
    );
};

export default Dashboard;
