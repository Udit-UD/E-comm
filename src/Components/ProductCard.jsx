import React, { useState } from 'react';
import {Button, ButtonBase, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import { useTheme } from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedProduct, setselectedProduct } from '../state';

export const ProductCard = ({ product }) => {
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [selected, setIsSelected] = useState(false);


    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    const handleClick = () => {
      const isProductInArray = products.some((p) => p === product.id);
      if(isProductInArray){
        setIsSelected(false);
        dispatch(removeSelectedProduct({productId: product.id}));
      }
      else{
        setIsSelected(true);
        dispatch(setselectedProduct({productId: product.id}));   
      }
    }

    return (
    <Card
    style={{ width: '20%'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
    <CardActionArea>
      <CardMedia
        component="img"
        alt={product.title}
        height="140"
        image={product.thumbnail} 
        style={{opacity:`${isHovered ? "0.6": "1"}`, position:"relative"}}
      />
      {isHovered ? 
      <ButtonBase sx={{position:"absolute", right:"0", bottom:"0"}} onClick={handleClick}>
        <Button component="div" color='primary'>
            {selected ? 
                <Favorite />
                :
                <FavoriteBorder  />
            }
        </Button> 
      </ButtonBase>
       : <></>
      }
      <CardContent>
        <Typography fontSize={"0.75rem"} color={dark} component="div">
          {product.brand}
        </Typography>
        <Typography variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price} 
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};
