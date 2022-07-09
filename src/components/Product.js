import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Product = ({item,cost,quantity,date,use,image,user,isUser,id}) => {

  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myproducts/${id}`)
  }


  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/product/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/products"));
  };


  return (
    <Box >
        <Card sx={{width: 260, height: "90%" ,margin:5, padding:1, 
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
            boxShadow: "10px 10px 20px #ccc",cursor: "pointer"
        }
        }} 
        variant="outlined">

      <CardHeader
      avatar={
        <Avatar sx={{bgcolor: "green"}} aria-label={item} >
          {user ? user.charAt(0) : ""}

        </Avatar>
      }
        title={item}
        subheader={date}
      />
      <CardMedia
        component = "img"
        height = "180"
        image={image}
        alt="model"
      />
      <br />
      <hr />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>{user} {':'}</b>  {use}
        </Typography>
          <Typography display="flex">
            <Box marginRight={"auto"}>₹ {cost}</Box>
            <Box>{quantity} quantity</Box>
          </Typography>
          {isUser &&(
            <Box display='flex'>
              <IconButton onClick={handleEdit} sx={{marginRight:'auto'}}><ModeEditOutlineIcon color="primary" fontSize='large' /></IconButton>
              <IconButton onClick={handleDelete} ><DeleteForeverIcon color="error" fontSize='large' /></IconButton>
            </Box>
          )}

      </CardContent>
        </Card>

    </Box>
  )
}

export default Product