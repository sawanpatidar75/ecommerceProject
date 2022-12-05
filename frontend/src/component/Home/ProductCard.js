import React from 'react';
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';


const ProductCard = ({ product }) => {

  const options = {
    size: 'small',
    value: product.ratings,     //ratingChanged(),
    readOnly: true,
    precision: 0.5,
  }

  return (
    <Link className='productCard' to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options}/>{" "}
        <span className='productCardSpan'>({product.numberOfReviews} Reviews)</span>
      </div>
      <span>{`Rs.${product.price}`}</span>
    
    </Link>
    
  )
}

export default ProductCard