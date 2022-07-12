import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store'

const Auth = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });}



    const dispath = useDispatch();
    const navigate = useNavigate();


    const [inputs, setInputs] = useState({
      name:"",email:"",password:""
    })
    const [isSignup, setIsSignup] = useState(false)


    const sendRequest = async (type = "login") => {
      const res = await axios
        .post(`https://inventory27.herokuapp.com/api/user/${type}`, {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        })
        .catch((err) => console.log(err));
  
      const data = await res.data;
      console.log(data);
      return data;
    };
  

    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      if (isSignup) {
        sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(()=>dispath(authActions.login()))  
        .then(() => navigate("/myproducts"))
      } else {
        sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(()=>dispath(authActions.login()))
        .then(() => navigate("/myproducts"))
      }
    };
  




  return (
    <div>
            <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          sx={{ background: " linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"}}
        >
          <Typography variant="h3" padding={3} textAlign="center">
          {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
            required
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              id="outlined-basic" label="UserName" variant="outlined"
            />
          )}{" "}
          <TextField
            required
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            id="outlined-basic" label="e-mail Id" variant="outlined"
          />

          
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          name="password"
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={inputs.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />



        </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
          onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth