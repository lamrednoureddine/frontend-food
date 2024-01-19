import React, { useState } from 'react';
import {
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import './sidebar.css'
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/productList",
            name:"Product List",
        
    
            icon:<FaShoppingBag/>
        },
        {
            path:"/commandes",
            name:"Commandes",
            icon:<FaRegChartBar/>
        },
        {
            path:"/create-product",
            name:"create product",
            icon:<FaCommentAlt/>
        },
        {
            path:"/userlist",
            name:"User List",
            icon:<FaUserAlt/>
        },
      
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo" >ADMIN </h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={`/dashboard${item.path}`} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className='container-rightside'>{children}</main>
        </div>
    );
};

export default Sidebar;