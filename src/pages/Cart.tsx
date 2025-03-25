import React from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { removeFromCart, selectCartItems, selectTotalPrice } from "../store/slices/cartSlice";

const Cart: React.FC = () => {
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectTotalPrice);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Корзина
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="body1">Ваша корзина пуста</Typography>
            ) : (
                <List>
                    {cartItems.map((item) => (
                        <ListItem
                            key={item.product.id}
                            sx={{ borderBottom: "1px solid #eee" }}
                        >
                            <ListItemText
                                primary={`${item.product.title} x${item.quantity}`}
                                secondary={`$${(item.product.price * item.quantity).toFixed(2)}`}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => dispatch(removeFromCart(item.product.id))}
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
