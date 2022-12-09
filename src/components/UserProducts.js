import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./Product";

const UserProducts = () => {
  const [user, setUser] = useState();

  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`https://inventory-dgy3.onrender.com/api/product/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {" "}
      {user &&
        user.products &&
        user.products.map((product, index) => (
          <Product
            key={index}
            isUser={true}
            id={product._id}
            item={product.item}
            cost={product.cost}
            quantity={product.quantity}
            date={product.date}
            use={product.use}
            image={product.image}
            user={user.name}
          />
        ))}
    </Box>
  );
};

export default UserProducts;
