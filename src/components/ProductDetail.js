import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}

const ProductDetail = () => {

  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [inputs, setInputs] = useState({});


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/product/update/${id}`, {
        item: inputs.item,
        cost: inputs.cost,
        quantity: inputs.quantity,
        use: inputs.use,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(product);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then((data) => console.log(data))
    .then(() => navigate("/myproducts/"));

  };



  const id = useParams().id;
  console.log(id);

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/product/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {setProduct(data.product);
      setInputs({
        item: data.product.item,
        cost: data.product.cost,
        quantity: data.product.quantity,
        use: data.product.use,
      });
    });
  }, [id]);



  useEffect(() => {})
  
  return (
    <div>

        {inputs && (
      <form onSubmit={handleSubmit}>
        <Box
        sx={{background: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"}}
        border={3} borderColor="lime" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={2} margin={"auto"} marginTop={3} marginBottom={3} display='flex' flexDirection={'column'} width={"50%"}>
          
          <Typography fontWeight={'bold'} padding={3} color="black" variant="h3" textAlign={'center'}>Add Your Inventory</Typography>
          
          <InputLabel sx={labelStyles}>Item Name</InputLabel>
          <TextField name="item" onChange={handleChange} value={inputs.item} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Cost</InputLabel>
          <TextField name="cost" onChange={handleChange} value={inputs.cost} margin="auto" variant="outlined" />
          
          <InputLabel sx={labelStyles}>Quantity</InputLabel>
          <TextField name="quantity" onChange={handleChange} value={inputs.quantity} margin="auto" variant="outlined" />
                    
          <InputLabel sx={labelStyles}>Uses</InputLabel>
          <TextField name="use" onChange={handleChange} value={inputs.use} margin="auto" variant="outlined" />
          
          <Button sx={{ mt: 2, borderRadius: 4 }} variant="contained" color="warning" type="submit" >Submit</Button>

        </Box>
      </form>
)}
    </div>
  )
}

export default ProductDetail