import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductState {
  product: Product;
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  product: {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
  products: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    insertProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },

    insertProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertProduct, insertProducts } = productSlice.actions;

export default productSlice.reducer;
