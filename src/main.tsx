import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CartProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartProvider>
    </ThemeProvider>
);
