import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField, Modal,
    IconButton,
    Grid,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { toast } from "react-hot-toast";
import NavBar from "../NavBar/navbar";
import './sellerdashboard.css';

const SellerDashboard = ({ onJoinClick }) => {
    const [products, setProducts] = useState([]);
    const [isSeller, setIsSeller] = useState(true); // Set isSeller to true for the seller dashboard
    const [loggedIn, setLoggedIn] = useState(false);
    const [editProductModalOpen, setEditProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProductName, setEditedProductName] = useState("");
    const [editedProductDescription, setEditedProductDescription] = useState("");
    const [editedProductQuantity, setEditedProductQuantity] = useState("");
    const [editedProductPrice, setEditedProductPrice] = useState("");
    const navigate = useNavigate();

    const openEditProductModal = (product) => {
        setSelectedProduct(product);
        setEditedProductName(product.product_name);
        setEditedProductDescription(product.description);
        setEditedProductQuantity(product.quantity);
        setEditedProductPrice(product.price);
        setEditProductModalOpen(true);
    };
    const closeEditProductModal = () => {
        setEditProductModalOpen(false);
        setSelectedProduct(null);
    };
    const handleUpdateClick = async () => {
        try {
            const updatedProduct = {
                product_name: editedProductName,
                description: editedProductDescription,
                quantity: editedProductQuantity,
                price: editedProductPrice,
            };
            const response = await axios.put(
                `/seller/editproduct/${selectedProduct._id}`,
                updatedProduct,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("adminToken"),
                    },
                }
            );
            if (response.status === 200) {
                const updatedProducts = products.map((p) =>
                    p._id === selectedProduct._id
                        ? { ...selectedProduct, ...updatedProduct }
                        : p
                );
                setProducts(updatedProducts);
                toast.success("Product updated successfully");
                closeEditProductModal();
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
        }
    };
    const handleDeleteClick = async (productId) => {
        try {
            const response = await axios.delete(
                `/seller/deleteproduct/${productId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("adminToken"),
                    },
                }
            );
            if (response.status === 200) {
                const updatedProducts = products.filter((product) => product._id !== productId);
                setProducts(updatedProducts);
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
    };
    async function getProducts() {
        try {
            const response = await axios.get(
                "/seller/myproduct",
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("adminToken"),
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }
    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await getProducts();
            setProducts(productData);
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            setLoggedIn(true);
        }
    }, []);
    const productRows = [];
    for (let i = 0; i < products.length; i += 4) {
        const productRow = products.slice(i, i + 4);
        productRows.push(productRow);
    }
    const handelLogout = () => {
        localStorage.removeItem("adminToken");
        toast.success("Log Out Successfully");
        navigate("/");
    };
    return (
        <Container maxWidth="lg">
            <NavBar loggedIn={loggedIn} isSeller={isSeller} onLogout={handelLogout} />
            <div style={{ marginTop: "5px" }}>
                {productRows.map((productRow, rowIndex) => (
                    <Grid container spacing={2} key={rowIndex}>
                        {productRow.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <div
                                    sx={{ my: 2, p: 1, border: "1px solid black" }}
                                    style={{ border: "1px solid black", padding: "1px" }}
                                >
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
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                        }}
                                        src={product.image_key}
                                        alt={product.product_name}
                                    />
                                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}> */}
                                    <IconButton
                                        color="success"
                                        aria-label="Edit"
                                        onClick={() => openEditProductModal(product)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        aria-label="Delete"
                                        onClick={() => handleDeleteClick(product._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    {/* </div> */}
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </div>

            {selectedProduct && (
                <Modal open={editProductModalOpen} onClose={closeEditProductModal} style={{}}>
                    <div className="edit-modal-container">
                        <div className="edit-modal">
                            <Typography variant="h6" component="h6">
                                Edit Product
                            </Typography>
                            <TextField
                                label="Product Name"
                                value={editedProductName}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setEditedProductName(e.target.value)}
                            />
                            <TextField
                                label="Description"
                                value={editedProductDescription}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setEditedProductDescription(e.target.value)}
                            />
                            <TextField
                                label="Quantity"
                                value={editedProductQuantity}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setEditedProductQuantity(e.target.value)}
                            />
                            <TextField
                                label="Price"
                                value={editedProductPrice}
                                fullWidth
                                margin="normal"
                                onChange={(e) => setEditedProductPrice(e.target.value)}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>

                                <Button variant="contained" color="primary" onClick={handleUpdateClick} style={{ backgroundColor: "#4caf50" }}>
                                    Update
                                </Button>
                                <Button variant="contained" color="primary" onClick={closeEditProductModal} style={{ backgroundColor: "#FF0000",marginLeft:'15px' }}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </Container>
    );
};

export default SellerDashboard;
