import React, { useState, useEffect } from "react";
import axios from "axios";
import "./patisserie.css"; // Consider having a separate CSS file if needed
import FoodDetails from "../foodDetails/FoodDetails"; // Or a specific Details component for patisseries 
import FilterComponent from "./FilterComponent"; // Reuse or customize for patisserie filters
import ImageSlider from "./ImageSlider"; // Reuse the image slider
import images from "./images"; // Update with images specific to patisseries

const PatisserieMenu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    {id:1,name:"cakes"},
    {id:2,name:"pastries"},
    {id:3,name:"breads"},
  
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100});
  const [filteredProducts, setFilteredProducts] = useState(products);


  const fetchProducts = async () => {
    try {
      // Update the URL to the endpoint for patisserie products
      const response = await axios.get("http://localhost:5000/product/patisserie-products");
      setProducts(response.data);
    } catch (error) {
      console.error("Fetching patisserie products failed:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    let updatedProducts = products;

    // Filter by category if there is a selected category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    // Filter by search query if it exists
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price if both min and max prices are specified
    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      updatedProducts = updatedProducts.filter(product =>
        product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, searchQuery, priceRange, products]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePriceChange = (event) => {
            const value = parseInt(event.target.value, 10);

    setPriceRange({ ...priceRange, max: value });
        
    // Display the price next to the slider
    document.getElementById('price-value').textContent = ` ${value}$`;
};
  return (
    <div className="container">
      <div className="slider">
        <ImageSlider images={images}/>
      </div>
      <div className="content-container">
        <div className="filter-container">
          <FilterComponent
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            onPriceChange={handlePriceChange}
          />
        </div>
        <div className="patisserie-products">
          {/* Map through filteredProducts to display each product */}
          {products.length > 0 ? (
            filteredProducts.map((product) => (
              <FoodDetails key={product._id} {...product} />
              // Or use a different details component specific for patisseries
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatisserieMenu;
