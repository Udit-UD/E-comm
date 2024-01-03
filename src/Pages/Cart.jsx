import React, { useEffect, useState } from 'react';
import Flex from '../Components/Flex';
import { Navbar } from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CardMedia, useTheme, IconButton, Divider, Button, ButtonBase } from '@mui/material';
import { Close } from '@mui/icons-material';
import { removeSelectedProduct } from '../state';

export const Cart = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.products);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;


  const getProducts = async() => {
    try {
        const promises = products.map(async (productId) => {
          const response = await fetch(`https://dummyjson.com/products/${productId}`);
          const data = await response.json();
          return data;
        });
  
        const fetchedProducts = await Promise.all(promises);
        setCartProducts(fetchedProducts);
        const total = fetchedProducts.reduce((acc, product) => acc + product.price, 0);
        setPrice(total);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
  }

  const handleDelete = async(productId) => {
    try{
        dispatch(removeSelectedProduct({productId}));
        window.location.reload();
    }
    catch(e){
        console.log(e.message);
    }
  }

  useEffect(()=>{
    getProducts();
  }, []);
  return (
    <Flex p="1rem 3rem" flexDirection="column">
        <Navbar />
        <Box display="flex" width="100%" gap="1rem" >
            <Box display="flex" flexDirection="column"  width="100%" gap="1rem" >
                {cartProducts && cartProducts.map((product) => (
                    <Box display="flex" key={product.id} justifyContent="space-evenly" gap="0.5rem" height="auto">
                        <Box width="25%" height="25vh">
                            <CardMedia
                                component="img"
                                alt={product.title}
                                height="100%"
                                image={product.thumbnail} 
                            />
                        </Box>
                        <Box display="flex" flexDirection="column" width="55%" p="1rem 0.25rem">
                            <Typography fontSize={"0.75rem"} color={dark} component="div">
                                {product.brand}
                            </Typography>
                            <Typography variant="h5">
                                {product.title}
                            </Typography>
                            <Typography fontSize={"0.75rem"}  component="div">
                                {product.description}
                            </Typography>
                            <Typography variant="body1" mt="3rem" color="text.secondary">
                                Price: ${product.price} 
                            </Typography>
                        </Box>
                        <Box width="5%">
                            <IconButton sx={{height:"5vh"}} onClick={()=>handleDelete(product.id)} p="1rem 0.25rem">
                                <Close />
                            </IconButton>
                        </Box>
                        
                    </Box>
                ))}
            </Box>
            <Box display="flex" flexDirection="column" width="30%" minHeight="50vh" p="1rem" bgcolor={alt} borderRadius="10px">
                <Typography variant="h4" mb="1rem" textAlign="center">
                    Bill Info
                </Typography>
                <Divider sx={{marginBottom:"1rem"}} />
                <Box display="flex" justifyContent="space-between" flexDirection="column" height="100%">
                    <Box display="flex" flex="1" flexDirection="column">
                        {cartProducts ? (
                            cartProducts.map((product) => (
                                <Box display="flex" key={product.id} m="1rem 0rem" justifyContent="space-between">
                                    <Box width="75%">
                                        <Typography>
                                            {product.title}
                                        </Typography>
                                    </Box>
                                    <Box width="20%">
                                        <Typography>
                                            {product.price}$
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Typography>Your cart is empty {":("}</Typography>
                        )}
                    </Box>
                    {cartProducts && 
                    <Box>
                        <Box display="flex" p="1rem 0.5rem" justifyContent="space-between">
                            <Typography variant='h5'>SubTotal</Typography>
                            <Typography variant='h5'>{price}$</Typography>
                        </Box>
                        <ButtonBase sx={{width:"100%"}}>
                            <Button fullWidth variant='outlined'> Proceed to checkout </Button>
                        </ButtonBase>
                    </Box>
                    } 
                </Box>
            </Box>
        </Box>
    </Flex>
  )
}
