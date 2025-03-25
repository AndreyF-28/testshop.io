import React, { useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { Box, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProducts, selectCategories, selectFilteredProducts } from "../store/slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";

interface ProductListProps {
    searchQuery: string;
    selectedCategory: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    searchQuery,
    selectedCategory,
    onSearchChange,
    onCategoryChange,
}) => {
    const dispatch = useAppDispatch();
    const loadingStatus = useAppSelector((state) => state.products.status);
    const filteredProducts = useAppSelector((state) =>
        selectFilteredProducts(state, searchQuery, selectedCategory)
    );
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loadingStatus === "loading") {
        return <LoadingSpinner />;
    }

    if (loadingStatus === "failed") {
        return <Typography color="error">Ошибка загрузки товаров</Typography>;
    }

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                <TextField
                    label="Поиск"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <TextField
                    select
                    label="Категория"
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">Все категории</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Grid2 container spacing={3}>
                {filteredProducts.map((product) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <ProductCard product={product} />
                    </Grid2>
                ))}
                {filteredProducts.length === 0 && (
                    <span>Товаров не обнаружено</span>
                )}
            </Grid2>
        </Box>
    );
};

export default ProductList;
