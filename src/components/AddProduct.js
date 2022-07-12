import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}

const AddProduct = () => {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    item: "",
    cost: "",
    quantity: "",
    date: "",
    use: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post("https://inventory27.herokuapp.com/api/product/add", {
        item: inputs.item,
        cost: inputs.cost,
        quantity: inputs.quantity,
        date: inputs.date,
        use: inputs.use,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/myproducts"));
  };




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        sx={{background: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"}}
        border={3} borderColor="lime" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={2} margin={"auto"} marginTop={3} marginBottom={3} display='flex' flexDirection={'column'} width={"50%"}>
          
          <Typography  fontWeight={'bold'} padding={3} color="black" variant="h3" textAlign={'center'}>Add Your Inventory</Typography>
          
          <InputLabel sx={labelStyles}>Item Name</InputLabel>
          <TextField name="item" onChange={handleChange} value={inputs.item} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Cost</InputLabel>
          <TextField name="cost" onChange={handleChange} value={inputs.cost} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Quantity</InputLabel>
          <TextField name="quantity" onChange={handleChange} value={inputs.quantity} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Date</InputLabel>
          <TextField name="date" onChange={handleChange} value={inputs.date} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Uses</InputLabel>
          <TextField name="use" onChange={handleChange} value={inputs.use} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Image Url</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} margin="auto" variant="outlined" />

          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit" >Submit</Button>

        </Box>
      </form>
    </div>
  )
}

export default AddProduct