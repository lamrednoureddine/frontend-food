// OrderDetails.js
import React from 'react';

const OrderDetails = ({ order }) => {
    return (
        <div className="order-details">
            <h2>Order Details</h2>
            {order.products.map((product, index) => (
                <div key={index} className="product-details">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> {product.price}$</p>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
