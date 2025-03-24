import React from "react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card className={styles.card}>
            <Box className={styles.mediaContainer}>
                <CardMedia
                    component="img"
                    className={styles.media}
                    image={product.image}
                    alt={product.title}
                />
            </Box>
            <CardContent className={styles.content}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className={styles.title}
                >
                    {product.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.description}
                >
                    {product.description}
                </Typography>
                <Box className={styles.footer}>
                    <Typography variant="h6" color="text.primary">
                        ${product.price}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        Добавить в корзину
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
