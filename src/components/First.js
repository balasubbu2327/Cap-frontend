import { Typography } from '@mui/material'
import React from 'react'

const First = () => {
  return (
    <div>
        <Typography variant='h1'sx={{color:'red', textAlign: 'center'}}>
            Inventory Management Tool 
        </Typography>
        <Typography variant='h3' sx={{width:'70%',margin:'auto' ,color:'blue',mt:5, textAlign: 'center'}}>
            This Inventory tool was made completely with Material UI.
            This is helpful for making the products in your home to arrange like a collection.
        </Typography>

    </div>
  )
}

export default First