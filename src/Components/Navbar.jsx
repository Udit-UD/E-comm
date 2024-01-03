import React from 'react'
import { IconButton, Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.products);
  
  const handleLogout = ()=>{
    dispatch(setLogout());
    navigate("/");
  }
  return (
    <Box p="1rem" display="flex" width="100%" gap="1rem" justifyContent="space-between">
        <Typography fontSize="1.5rem" sx={{ cursor:"pointer" }} onClick={()=>navigate("/home")}>
          Udit.Dev
        </Typography>
        <Box>
          
        <IconButton sx={{borderRadius:"10px", padding:"0.5rem",}} onClick={()=>{navigate("/cart")}}>
            <ShoppingCartIcon fontSize='2rem'/>
            ({products && products.length})
        </IconButton>
        {user &&
            <IconButton onClick={handleLogout}>
                <img src={`${user.image}`} width="50px" height="50px" alt="" style={{border:"1px solid gray", borderRadius:"50%"}}  />
            </IconButton>
        }
        </Box>
    </Box>
  )
}
