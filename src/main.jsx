import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Lazy load components for better performance
const Cart = lazy(() => import("./components/Cart"));
const CartItem = lazy(() => import("./components/CartItem"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const ProductItem = lazy(() => import("./components/ProductItem"));
const ProductList = lazy(() => import("./components/ProductList"));
const NotFound = lazy(() => import("./components/NotFound"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const Search = lazy(() => import ("./components/Search.jsx"));

// Router configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "cart", element: <Cart /> },
      { path: "cart-item/:cartId", element: <CartItem /> },
      { path: "product-detail/:productId", element: <ProductDetail /> },
      { path: "product-list/:category", element: <ProductItem /> },
      { path: "/", element: <ProductList /> },
      { path: '/checkout', element: <Checkout />},
      { path: '/search/:query', element: <Search />},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
  </StrictMode>
);
