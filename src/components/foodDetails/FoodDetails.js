import React from 'react'
import classes from './foodDetails.module.css'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {AiOutlineShoppingCart} from 'react-icons/ai'
import { addProduct } from '../../redux/cartSlice'

const FoodDetails = ({_id,type,title,desc,price,img,review,category}) => {
  const [foodDetails, setFoodsDetails] = useState({_id,type,title,desc,price,img,review,category})
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.cart)
  console.log(products)

  const changeQuantity = (command) => {
    if(command === 'dec'){
       if(quantity === 1) return
       setQuantity(prev => prev - 1)
    } else if(command === 'inc'){
       setQuantity(prev => prev + 1)
    }
  }

  const addToCart = () => {
    dispatch(addProduct({...foodDetails, quantity}))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
       
          <img src={img}/>

          </div>
          <h2 className={classes.title}>{title}</h2>
            <h3>Category: {category}</h3>
            <span></span>
          
            <div>Description:{desc} </div>
            <p>
              
            </p>
          
          <div className={classes.quantity}>
            <button disabled={quantity === 1} onClick={() => changeQuantity('dec')}>-</button>
            <span className={classes.quantityNumber}>{quantity}</span>
            <button onClick={() => changeQuantity('inc')}>+</button>
          </div>
          <div className={classes.price}>
            Price: <span>$</span> {price}
          </div>
          <button onClick={addToCart} className={classes.addToCart}>Add To Cart <AiOutlineShoppingCart /></button>
        </div>
      
    
  )
}

export default FoodDetails