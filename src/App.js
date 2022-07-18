import React, { useEffect,createContext, useState } from 'react';
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
import Model from './components/Model';

export const UserContext = createContext();

function App() {
  const dispath = useDispatch();

  const [user, setUser] = useState({})

  const isLoggedIn = useSelector(state=> state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  
  return (
    <UserContext.Provider value={{user,setUser}}>

  <React.Fragment>
    <header>
      <Header userDetails={user} />
    </header>
    <main>
      <Routes>
      <Route path="/" element={<First/>}/>
      <Route path="/table" element={<Model/>}/>
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
  </UserContext.Provider>
  )
}

export default App;