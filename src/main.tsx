import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import "./index.css";
import { store } from "./store/store.ts";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);
