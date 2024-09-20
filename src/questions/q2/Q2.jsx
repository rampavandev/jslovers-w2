import React, { useState, useEffect } from "react";
import { products } from "./data";
import "./styles.css";

const FilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState('');

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (maxPrice ? product.price <= maxPrice : true) &&
      (inStockOnly ? product.inStock : true) &&
      (minRating ? product.rating >= minRating : true)
    );
  });

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - fullStars - halfStars;

    return (
      <div className="star-rating">
        {Array(fullStars).fill(0).map((_, index) => (
          <span key={index} className="star full">★</span>
        ))}
        {halfStars ? <span className="star half">★</span> : null}
        {Array(emptyStars).fill(0).map((_, index) => (
          <span key={index} className="star empty">★</span>
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="filter-container">
      <h1 className="title">Clothing and Accessories</h1>

      <div className="content-container">
        {/* Filter Section */}
        <div className="filter-sidebar">
          <h3>Filters</h3>

          <input
            type="text"
            placeholder="Search Products"
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price (₹)"
            className="input-field"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>

          <h4>Rating</h4>
          <ul className="rating-filter">
            {[4.5, 4.0, 3.5, 3.0].map(rating => (
              <li key={rating}>
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    onChange={() => setMinRating(rating)}
                  />
                  {rating} & Up
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Cards */}
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p className="category">{product.category}</p>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <p className={`stock ${product.inStock ? '' : 'out-of-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <p className="material">Material: {product.material}</p>
                <p className="sizes">Available Sizes: {product.size.join(', ')}</p>
                {renderStars(product.rating)}
              </div>
            ))
          ) : (
            <p className="no-products-message">No products match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
