import React, { useState } from 'react'
import {AppBar,Box,Button,Tab,Tabs,Toolbar} from "@mui/material";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';


var styles = {
  default:{
    color: 'red',
    fontWeight: 'bolder',
    fontSize: '32px',
  }}

const Header = () => {
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  const dispath = useDispatch();


  const [value, setvalue] = useState()
  return (
    <AppBar 
    position='sticky'
    sx={{
    background: "linear-gradient(90deg, rgba(236,215,17,1) 0%, rgba(164,250,49,1) 100%)"
    }}>
        <Toolbar>
        
        <Tab style={styles.default} LinkComponent={Link} to="/" label="Management Tool"/>
        {/* <Typography variant="h4">Management Tool</Typography> */}


      {  isLoggedIn &&          <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
              <Tabs value={value} onChange={(e,val)=>setvalue(val)} >
                <Tab LinkComponent={Link} to="/products" label="AllInventory"/>
                <Tab LinkComponent={Link} to="/myproducts" label="MyInventory"/>
                <Tab LinkComponent={Link} to="/products/add" label="AddInventory"/>
              </Tabs>
            </Box> }
            <Box display="flex" marginLeft="auto">
      {!isLoggedIn &&  <>
                <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10}} color="warning">Login</Button>
                <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10}} color="warning">SignUp</Button>
       </>}   
              
       {  isLoggedIn &&  ( <Button onClick={()=>dispath(authActions.logout())} LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10}} color="warning">LOGOUT</Button>) }
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header