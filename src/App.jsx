import React, { useMemo } from 'react';
import {Routes, Route, Navigate,BrowserRouter} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import { LoginPage } from './Pages/LoginPage';
import { Homepage } from './Pages/Homepage';
import "./App.css";
import { themeSettings } from './theme';
import { createTheme } from "@mui/material/styles";
import { Cart } from './Pages/Cart';
import ProtectedRoute from './Pages/ProtectedRoute';


function App() {
  const theme = useMemo(() => createTheme(themeSettings("dark")), ["dark"]);

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route element={<ProtectedRoute />}> 
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
