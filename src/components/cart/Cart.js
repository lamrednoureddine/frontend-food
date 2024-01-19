import React, { useState } from 'react'
import classes from './cart.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineClose} from 'react-icons/ai'
import { removeProduct } from '../../redux/cartSlice'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const Cart = () => {
  const {products} = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {token, user} = useSelector((state)=>state.auth); // Including the user object here
  const userId = user?._id; 
  const [showLoginAlert, setShowLoginAlert] = useState(false); // State for showing login alert
  console.log('Products:', products);
  let totalPrice = 0
  products.map((product) => totalPrice += (product.quantity * product.price))

  const handleRemoveProduct = (id) => {
    console.log(id)
     dispatch(removeProduct({_id: id}))
  }
  const submitOrder = async (orderDetails) => {
    try {
      const response = await axios.post('http://localhost:5000/order', orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      console.log('Order submitted: ', response.data);
      // Optionally, do something after the order is successfully submitted...
    } catch (error) {
      console.error('Error submitting order: ', error);
      if (error.response && error.response.status === 401) {
        console.error('Authorization failed. Please log in again.');
        alert('Authorization failed. Please log in again.');
        // e.g., Redirect to login or display an error message
      }
    }
  };
  const handleOrder = async () => {
    if (products.length > 0 && userId) {
      // Construct the order details object with 'items' and 'userId'
      const orderDetails = {
        userId: userId,
       
        items: products.map(product => ({
          productId: product._id, // Use _id field of the product for reference
          quantity: product.quantity,
           // Include the quantity ordered
          // Additional fields can be included here as required by your Order model
        })),totalPrice: totalPrice,
      };
  
      console.log('Submitting order with details:', orderDetails);
  
      await submitOrder(orderDetails);
      navigate('/checkout');
    } else {
      // Handle the error case when no user id is available (e.g., the user is not logged in)
      console.error('User ID is not available. User might not be logged in.');
      setShowLoginAlert(true);
    }
  };

  return (
    <div className={classes.container}>
    <div className={classes.wrapper}>
      <div className={classes.left}>
        {products.length > 0 ? (
          <ul className={classes.productList}> {/* Add a class for styling the list */}
            {products.map((product) => (
              <li key={product._id} className={classes.productListItem}> {/* Use `li` for list items */}
                <div className={classes.product}>
                  <div onClick={() => handleRemoveProduct(product._id)} className={classes.closeBtn}>
                    <AiOutlineClose />
                  </div>
                  <img src={product.img} alt={product.title} className={classes.img}/>
                  <div className={classes.productData}>
                    <h3 className={classes.title}>{product.title}</h3>
                    <div className={classes.productAndQuantity}>
                      <span className={classes.quantity}>{product.quantity} x </span>
                      <span className={classes.price}><span>$</span>{product.price}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className={classes.noProducts}>No products in the cart. Go shopping!</h1>
        )}
      </div>
      <div className={classes.right}>
        <div className={classes.totalProductMsg}>Total products: {products.length}</div>
        <div className={classes.subtotalCheckoutBtns}>
          <span className={classes.subtotal}>Subtotal: ${totalPrice}</span>
          <button onClick={handleOrder} disabled={products.length === 0} className={classes.orderNowBtn}>
            Order now
          </button>
          {showLoginAlert && (
            <div className={`${classes.loginAlert} ${showLoginAlert ? classes.showLoginAlert : ''}`}>
              <p>Please log in to place your order.</p>
              <button onClick={() => setShowLoginAlert(false)}>X</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Cart

