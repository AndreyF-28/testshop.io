import React from "react";
import { useCart } from "../context/CartContext";
import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";

const Cart: React.FC = () => {
    const { cart, removeFromCart, totalPrice } = useCart();

    console.log(cart);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Корзина
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Ваша корзина пуста</Typography>
            ) : (
                <List>
                    {cart.map((product) => (
                        <ListItem
                            key={product.id}
                            sx={{ borderBottom: "1px solid #eee" }}
                        >
                            <ListItemText
                                primary={product.title}
                                secondary={`$${product.price}`}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Удалить
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
            <Typography variant="h6" sx={{ mt: 2 }}>
                Общая стоимость: ${totalPrice.toFixed(2)}
            </Typography>
        </Box>
    );
};

export default Cart;
