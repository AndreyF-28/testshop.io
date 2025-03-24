import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Магазин
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Главная
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                    Корзина
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
