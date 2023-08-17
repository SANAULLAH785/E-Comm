import React from 'react';

function Cart({ cart }) {
    console.log(cart, 'cart');
    return (
        <div>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <ul>
                    {cart.map((product) => (
                        <li key={product._id}>
                            <h3>{product.product_name}</h3>
                            <p>Price: ${product.price}</p>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
