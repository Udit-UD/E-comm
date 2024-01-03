import React, { useEffect, useState } from 'react'
import { Box, InputBase, IconButton, Typography, CircularProgress, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import { Search } from '@mui/icons-material';
import Flex from "../Components/Flex";
import { Navbar } from '../Components/Navbar';
import { useSelector } from 'react-redux';
import { ProductCard } from '../Components/ProductCard';

export const Homepage = () => {
  const [searchStr, setSearchStr] = useState("");
  const [products, setProducts] = useState([] );
  const user = useSelector((state)=>state.user);
  const [filterChoice, setFilterChoice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = (event) => {
    const selectedChoice = event.target.value;
    setFilterChoice(selectedChoice);
    if(selectedChoice === 0){
      return products;
    }
    else if(selectedChoice === 1){
      setProducts(products.slice().sort((a, b) => a.price - b.price));
    }
    else{
      setProducts(products.slice().sort((a, b) => b.price - a.price));
    }
  }

  useEffect(()=>{
      ;(async() => {
        try {
          setIsLoading(true);
          const response = await fetch(`https://dummyjson.com/products/search?q=${searchStr}`, {
            method: "GET",
          });
          const data = await response.json();
          console.log(data);
          setProducts(data.products);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }     
    })();
  }, [searchStr]);
  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap="1rem" p="1rem 3rem" minHeight="100vh">
      <Navbar />
      <Typography textAlign="center" variant="h2">Hey
        {user && <span style={{fontStyle:"italic"}}> {user.firstName}, </span> }
         Search For Products</Typography>
      <Flex width="100%" gap="1rem" >
        <InputBase placeholder='Start Typing...' type='text' value={searchStr} onChange={(e) => setSearchStr(e.target.value)} 
        sx={{border:"2px solid gray", borderRadius:"10px", padding:"0.75rem", width:"50%"}} />
        <IconButton size='large'>
          <Search fontSize='4rem' />
        </IconButton>
      </Flex>
      <Box width="100%" display="flex" alignItems="center" padding="0.5rem 3rem" justifyContent="flex-end" >        
      <FormControl>
      <InputLabel id="demo-simple-select-label">Filter</InputLabel>
      <Select
        value={filterChoice}
        label="Filter"
        onChange={handleFilter}
      >
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={1}>Low To High</MenuItem>
        <MenuItem value={2}>High To Low</MenuItem>
      </Select>
    </FormControl>
      </Box>
      {isLoading ? <CircularProgress /> : 

        <Flex width="100%" flexWrap="wrap" gap="1.5rem">
          {
            products.length===0 ? ("No products found") : 
            (
              products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
              ))
            )
          }
        </Flex>      
      }
      
    </Box>
  )
}
