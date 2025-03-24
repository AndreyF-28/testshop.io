import React from "react";
import ProductList from "../components/ProductList";
import {Container} from "@mui/material";

const Home: React.FC = () => {
    return (
        <Container sx={{ padding: 3 }}>
            <ProductList/>
        </Container>
    );
};

export default Home;
