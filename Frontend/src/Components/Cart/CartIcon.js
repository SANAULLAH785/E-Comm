import React from 'react';
import { IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartIcon = ({ cartCount,cart }) => {
    const navigate = useNavigate();
    const handelclick=()=>{
        if(cartCount===0){
            toast.success("No item in cart");
            navigate('/');
        }else{
            navigate('/cart');
        }
    }
  return (
    <IconButton  aria-label="Cart" onClick={handelclick}>
      <Badge badgeContent={cartCount} color="success" >
        <ShoppingCart  color="success" />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;