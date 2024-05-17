import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductAPI, getProductDetailAPI } from "./productAPI";
import { act } from "react";
import ProductDetail from "./ProductDetail";



const initialState = {
    loading: false,
    data: {},
    productDetail: {
        loading:false,
        data: {}
    }
}


export const getAllProducts = createAsyncThunk("product/getAllProducts" , async () => {
    try{
        const response = await getProductAPI()
        if(response?.status == 200) {
            return response.data
        }
    }catch(error){
        console.error(error.massage);
    }
})


// export const getProductDetail = createAsyncThunk("product/getProductDetail" , async (productId) => {
//   const response = await getProductDetailAPI(productId)
// })

export const getProductDetail = createAsyncThunk("product/getProductDetail" , async (productId) => {
    const response = await getProductDetailAPI(productId)
    if(response?.status == 200){
        return response.data
    }
})

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        }).addCase(getAllProducts.fulfilled, (state , action) => {
            state.loading = false
            state.data = action.payload
        }).addCase(getProductDetail.pending , (state) => {
            state.productDetail.loading = true

        }).addCase(getProductDetail.fulfilled,(state,action) => {
            state.productDetail.loading = false
            state.productDetail.data = action.payload
        })
    }
})

export default productSlice.reducer