import React, { useState } from 'react';
import { products as initialProducts } from '../../assets/products';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState(initialProducts);

  const handlePriceChange = (index, newPrice) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = Number(newPrice);
    setProducts(updatedProducts);
  };

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <div className="product-subcontainer" key={index}>
          <div>{product.product_name}</div>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handlePriceChange(index, e.target.value)}
            className="price-input"
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
