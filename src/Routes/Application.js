import React from 'react'

import {  Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from '../components/Home';
import Inscription from '../components/Inscription';
import Login from '../components/Login';
 import Contact from '../components/Contact';
import Cart from '../components/Cart';
const Application = () => {
  return (
      <div>
        
      <Routes>
        {/* <Route path="/" element={<UtilisateurInterface/>}>   */}
        <Route  path="/Home" element={<Home/>}/>
        <Route  path="/Cart" element={<Cart/>}/>
        <Route  path="/Login" element={<Login/>}/>
        <Route  path="/Demande" element={<Inscription/>}/>
        <Route  path="/Inscription" element={<Contact/>}/>
         {/* <Route path="/Admin" element={<AdminInterface/>}>    </Route>  */}
     </Routes>
     </div>
  )
}

export default Application