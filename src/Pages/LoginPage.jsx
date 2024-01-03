import { useTheme } from '@emotion/react'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { LoginForm } from '../Components/LoginForm';

export const LoginPage = () => {
    const theme = useTheme();
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container sx={{width:"40%", marginTop: "5vh", padding:"2rem", borderRadius: "10px", background:`${alt}`}} >
            <Typography 
                fontWeight="bold"
                fontSize="clamp(1.25rem, 1.5rem, 1.75rem)"
                color= {dark}
                textAlign="center">
                Login Page
            </Typography>
            <Typography textAlign="center" variant="body1" color="textSecondary">
                One stop solution for Geeks!
            </Typography>
            <LoginForm />
        </Container>
    </Box>
  )
}

//backgroundColor: "rgba(255,255,255,0.5)", backdropFilter:"blur(20px)", boxShadow:"0 1px 12px rgba(0,0,0,0.25)", border:"1px solid rgba(255,255,255,0.3)"