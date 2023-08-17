import React from 'react';
import './CartPage.css';

function Cart({ cart }) {
    console.log(cart, 'cart');
    
    const handleIncreaseQuantity = (productId) => {
    };

    return (
        <div className="cart-page">
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div className="cart-container">
                    {cart.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image_key} alt={product.product_name} />
                            <h3>{product.product_name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={() => handleIncreaseQuantity(product._id)}>Edit</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
