
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import AdminDashboard from './components/Admin/AdminDashboard'
import RestaurantMenu from './components/restaurents/RestaurantMenu';
import PatisserieMenu from './components/pattesserie/PatisserieMenu';
import ProtectedRoute from './components/Admin/ProtectedRoute';

function App() {
 const location = useLocation()
 
 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])
  return (
    <div>
       <Navbar />
       <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
           <Route path='/cart' element={<Cart />} />
         <Route path='/checkout' element={<Checkout />} />
         <Route path='/Restaurents' element={<RestaurantMenu />}/>
         <Route path='/Patessiries' element={<PatisserieMenu/>} />
       <Route path='/' element={<Home />} />
       </Routes>
       <Footer />
    </div>
  );
}

export default App;
