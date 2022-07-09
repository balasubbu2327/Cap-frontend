import React, { useEffect } from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";

import Header from './components/Header';

import Auth from './components/Auth';
import Products from './components/Products';
import UserProducts from './components/UserProducts';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import First from './components/First';

function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector(state=> state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  
  return (
  <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
      <Route path="/" element={<First/>}/>
      {!isLoggedIn ? (
        <Route path="/auth" element={<Auth/>}/>
      ) : (
    <>
        <Route path="/products" element={<Products/>}/>
        <Route path="/myproducts" element={<UserProducts/>}/>
        <Route path="/myproducts/:id" element={<ProductDetail/>}/>
        <Route path="/products/add" element={<AddProduct/>}/>
    </>
  )}

      </Routes>
    </main>
  </React.Fragment>
  )
}

export default App;