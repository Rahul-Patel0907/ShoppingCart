import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/interfaces";

interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null,
    searchQuery: "",
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        // Map 'title' from API to 'name' in our interface
        return data.map((item: any) => ({
            id: item.id,
            name: item.title, // Mapping title to name as per your interface
            price: item.price,
            description: item.description,
            image: item.image,
        })) as Product[];
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch products";
            });
    },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
