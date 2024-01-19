// AdminDashboard.jsx
import React from 'react'
import Sidebar from '../Sidebar'
import { Route, Routes } from 'react-router'
import ProductList from './ProductList'
import './Admindashboard.css'
import Create from './Create'
import UserList from './UserList'
import Commandes from './Commandes'

const AdminDashboard = () => {
  return (
    <div className='dashboard'>
       <div className="sidebar">
          <Sidebar/>
        </div>
        <main className="content">
          <Routes>
           
            <Route path="/create-product" element={<Create/>} />
            <Route path="/commandes" element={<Commandes/>} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/productList" element={<ProductList />} />
          </Routes>
        </main>
    </div>
  )
}

export default AdminDashboard
