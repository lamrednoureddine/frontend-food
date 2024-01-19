



import React from 'react';
import './filtercomponent.css'
const FilterComponent = ({ categories, onCategoryChange, onSearchChange, onPriceChange }) => {
  return (
    <div className="filters">
      
      {/* filter by search  */}
      <div className="filter-by-search">
        <label htmlFor="search-input">Search:</label>
        <input id="search-input" type="text" placeholder="Search products…" onChange={onSearchChange} />
      </div>
      {/* filter-by-category */}
      <div className="filter-by-category">
        <label htmlFor="category-select">Filter by Category:</label>
        <select id="category-select" onChange={onCategoryChange}>
          
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      
      {/* filter-by-price */}
      <div className="filter-by-price">
        <label htmlFor="price-range">Filter by Price:</label>
        <div id="price">

<span id="price-value-left">0</span ><span id="price-value-right">100</span>
</div>
        <input name="priceRange" id="price-range" type="range" min="0" max="100" step="1" onChange={onPriceChange} />
        <span id="price-value"></span>
      </div>
    </div>
  );
};
export default FilterComponent;