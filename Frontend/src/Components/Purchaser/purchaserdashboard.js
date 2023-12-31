import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, AppBar, Toolbar, IconButton, Grid,Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import NavBar from '../NavBar/navbar';
import { toast } from 'react-hot-toast';

const PurchaserDashboard = ({ onJoinClick }) => {
    const [products, setProducts] = useState([]);
    const [showAuthRoutes, setShowAuthRoutes] = useState(false);

    const navigate = useNavigate();

    const handleJoinClick = () => {
        const token= localStorage.getItem("adminToken")
        if(token){
            navigate('/');
            toast.success("Alrady Login")

        }
        else{
            navigate(ROUTES.AUTH_ROUTES.login);

        }

    };

    async function getProducts() {
        const response = await axios.get('/products');
        
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
    const handelLogout=()=>{
     localStorage.removeItem("adminToken");
     toast.success("Log Out Successfully");
     navigate('/');
    };

    return  (
        <Container maxWidth="2xl">
            <NavBar></NavBar>
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
                                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}> */}
                                        {/* <IconButton color="success" aria-label="Edit" onClick={() => handleUpdateClick(product)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="Delete" onClick={() => handleDeleteClick(product._id)}>
                                            <DeleteIcon />
                                        </IconButton> */}
                                    {/* </div> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </div>
        </Container>
    );
};

export default PurchaserDashboard;
