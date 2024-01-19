import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load the products');
    }
  };

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/${productId}`);
      if (response.status === 200) {
        // Refresh the list after deleting the product
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product');
    }
  };
  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/product/${editingProduct._id}`, editingProduct);
      if (response.status === 200) {
        fetchProducts();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product');
    }
  };
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  return (
    <>
    {isModalOpen && (
      <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleEditProductSubmit} className="edit-product-form">
  <div className="form-group">
    <label htmlFor="type">Type</label>
    <select
      id="type"
      value={editingProduct.type}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, type: e.target.value })
      }
      className="form-control"
    >
      <option value="">Select Type</option>
      <option value="sale">Sallé</option>
      <option value="sucre">Sucré</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input
      type="text"
      id="title"
      value={editingProduct.title}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, title: e.target.value })
      }
      minLength={4}
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="desc">Description</label>
    <textarea
      id="desc"
      value={editingProduct.desc}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, desc: e.target.value })
      }
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="price">Price</label>
    <input
      type="number"
      id="price"
      value={editingProduct.price}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
      }
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="img">Image URL</label>
    <input
      type="text"
      id="img"
      value={editingProduct.img}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, img: e.target.value })
      }
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="review">Review</label>
    <input
      type="number"
      id="review"
      value={editingProduct.review}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, review: e.target.valueAsNumber })
      }
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="category">Category</label>
    <input
      type="text"
      id="category"
      value={editingProduct.category}
      onChange={(e) =>
        setEditingProduct({ ...editingProduct, category: e.target.value })
      }
      className="form-control"
    />
  </div>
    
          {/* Buttons */}
          <button type="submit">Save Changes</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </div>
    </div>
    )}
    <div className="product-list-container">
      <h2 className="product-list-heading">Product List</h2>
      <ul className="product-list-ul">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <span className="product-info">{product.title} - ${product.price}</span>
            <div className="product-actions">
              <button onClick={() => openEditModal(product)}>Edit</button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default ProductList;
