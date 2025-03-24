import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = React.lazy(() => import("./pages/Home"));
const Cart = React.lazy(() => import("./pages/Cart"));

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
