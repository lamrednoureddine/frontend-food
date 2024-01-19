import React from 'react'
import {Link} from 'react-router-dom'
import saller from "../../assets/saller.jpg";
import classes from './foods.module.css'

const Foods = () => {
  return (
    <section id="foods" className={classes.container}>
      <div className={classes.wrapper}>
        <h4 className={classes.subtitle}>Nos offres</h4>
        <h2 className={classes.title}>Meilleurs plats à coté de chez toi </h2>
        <div className={classes.foods}>
          
            <Link to={`/Restaurents`} className={classes.food}>
              <h4>Sallé</h4>
              <div className={classes.imgContainer}>
                <img src={saller}/>
              </div>
            </Link>
            <Link to={`/Patessiries`} className={classes.food}>
              <h4>Surcé</h4>
              <div className={classes.imgContainer}>
                <img src={saller}/>
              </div>
            </Link>
            
        </div>
      </div>
    </section>
  )
}

export default Foods