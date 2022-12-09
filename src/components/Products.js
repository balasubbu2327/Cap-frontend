import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { Box } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://inventory-dgy3.onrender.com/api/product")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setProducts(data.products));
  }, []);

  console.log(products);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {products &&
        products.map((product, index) => (
          <Product
            key={index}
            isUser={localStorage.getItem("userId") === product.user._id}
            id={product._id}
            item={product.item}
            cost={product.cost}
            quantity={product.quantity}
            date={product.date}
            use={product.use}
            image={product.image}
            user={product.user.name}
          />
        ))}
    </Box>
  );
};

export default Products;
