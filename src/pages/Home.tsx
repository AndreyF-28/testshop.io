import React, { useState } from "react";
import ProductList from "../components/ProductList";
import { Container } from "@mui/material";

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    return (
        <Container sx={{ padding: 3 }}>
            <ProductList
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onSearchChange={setSearchQuery}
                onCategoryChange={setSelectedCategory}
            />
        </Container>
    );
};

export default Home;
