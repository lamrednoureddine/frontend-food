import React, { useState, useEffect } from "react";
import axios from "axios";
import "./restaurent.css";
import FoodDetails from "../foodDetails/FoodDetails";
import FilterComponent from "./FilterComponent";
import ImageSlider from "./ImageSlider";
import images from "./images";
const RestaurantMenu = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    {id:1,name:"pizza"},{id:2,name:"maklboub"},{id:3,name:"libanais"},{id:4,name:"panini"}]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100});
    const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Fetching products failed:", error);
    }
  };

  // Use useEffect to fetch products when the component is mounted
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
      <div className="restaurant-products">

        {products.length > 0 ? (
          filteredProducts.map((product) => (
            <FoodDetails key={product._id} {...product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      </div>
      </div>
  );
};
export default RestaurantMenu;
