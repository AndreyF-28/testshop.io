import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types";
import ProductCard from "./ProductCard/ProductCard";
import { Box, Grid2, MenuItem, TextField} from "@mui/material";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get<Product[]>(
                    "https://fakestoreapi.com/products"
                );
                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories = Array.from(
                    new Set(data.map((product) => product.category))
                );
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(
                (product) => product.category === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }

        if (searchQuery) {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [selectedCategory, searchQuery, products]);

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
                <TextField
                    label="Поиск"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TextField
                    select
                    label="Категория"
                    variant="outlined"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
            </Grid2>
        </Box>
    );
};

export default ProductList;
