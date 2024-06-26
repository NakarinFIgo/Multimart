import React from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ProductDetail from '../pages/ProductDetail'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProtectedRoute from './ProtectedRoute'
import AddProducts from '../admin/AddProducts'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard'
import Users from '../admin/Users'

function Routers() {
  return (
    <Routes path='/' element ={<Navigate to ='home'/>}>
        <Route path='cart' element={<Cart/>}/>
        <Route path='home' element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='shop/:id' element={<ProductDetail/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='/*' element={<ProtectedRoute/>}>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='dashboard/all-products' element={<AllProducts/>}/>
          <Route path='dashboard/add-products' element={<AddProducts/>}/>
          <Route path='dashboard/users' element={<Users/>}/>
        </Route>
    </Routes>
  )
}

export default Routers