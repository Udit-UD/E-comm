import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user: null,
    token: null,
    products: [],
    selectedProduct: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.token = null;
            state.user = null;
            state.products= [];
            state.selectedProduct= null;
        },
        setselectedProduct: (state, action) => {
            if(state.user){
                const {productId} = action.payload;
                if (Array.isArray(state.products)) {
                        state.products = [...state.products, action.payload.productId];
                }else {
                    state.products = [productId];
                }                        
                state.selectedProduct = productId;
            }
        },
        removeSelectedProduct: (state, action) => {
            if(state.user){
                const {productId} = action.payload;
                if (Array.isArray(state.products)) {
                    const isProductinProducts = state.products.includes(productId);
                    if(isProductinProducts){
                        state.products = state.products.filter(id => id !== productId);
                        state.selectedProduct = null;
                    }else{
                    }
                }                      
            }
        },
        setproducts: (state, action) => {
            state.products = action.payload.products;
        }
    }
})

export const { setLogin, setLogout, setproducts, setselectedProduct, removeSelectedProduct} = authSlice.actions;
export default authSlice.reducer;