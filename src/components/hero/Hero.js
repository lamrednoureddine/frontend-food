import React from 'react'
import classes from './hero.module.css'
import {AiOutlineArrowDown} from 'react-icons/ai'
import slice from "../../imges/Capture.JPG"

const Hero = () => {
  return (
    <section style={{height: '80vh'}} id="home" className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <h2 className={classes.title}>Hésitez oui , </h2>
          <p className={classes.title}>mais décidez ici<span></span></p>
          <p className={classes.secondMsg}>
          Des restaurants et des pâtisseries sont à votre disposition pour passer vos commandes  <br /> 
          </p>
          <p className={classes.desc}>
       
          </p>
          <div className={classes.buttons}>
            <button className={classes.buttonSee}><a href="#foods">Voir nos produits <AiOutlineArrowDown/> </a></button>
          </div>
        </div>
        <div className={classes.right}>
          <img src={slice} alt="" className={classes.manEatingImg}/>
        </div>
      </div>
    </section>
  )
}

export default Hero