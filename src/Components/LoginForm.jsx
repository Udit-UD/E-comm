import { Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            setError("");
            setIsLoading(true);
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: userName,
                    password: password, 
                })
            })
            if (response.status === 400) {
                const errorData = await response.json();
                setError(errorData.message); 
                return;
            }
            const data = await response.json();
            if(data){
                dispatch(
                    setLogin({
                        token: data.token,
                        user: {
                            firstName: data.firstName,
                            image: data.image
                        }
                    })
                );
                navigate("/home");
            }
            console.log(data);
        }
        catch(e){
            console.log(e);
        }
        finally{
            setIsLoading(false);
        }
    }
  return (
    <Box mt="5vh" >
        {error && 
            <Typography textAlign="center" color="red" variant='h6' mt="-2vh" mb="2vh">{error}</Typography>
        }
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"2rem"}}>
        <TextField
        label="Username"
        placeholder='udit_123'
        name='userName'
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
        fullWidth
        />
        <TextField
        label="Password"
        name='password'
        type='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        fullWidth
        />
       
        <LoadingButton loading={isLoading} variant="contained" fullWidth size="large" type='submit'  sx={{ width:"100%"}}>
            Login
        </LoadingButton>
        </form>
    </Box>
  )
}
