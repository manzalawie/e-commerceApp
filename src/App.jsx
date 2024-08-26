import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Error from './Components/Error/Error';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./Components/WishList/WishList";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import VerifyCode from './Components/VerifyCode/VerifyCode';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import ProtectedResetPass from "./Components/ProtectedResetPass/ProtectedResetPass";
import ProtectedResetPassFinal from './Components/ProtectedResetPassFinal/ProtectedResetPassFinal';
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from './Components/AllOrders/AllOrders';



let query = new QueryClient()
let routing = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: "cart", element:<ProtectedRoute> <Cart /> </ProtectedRoute> },
        { path: "brands", element:<ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: "categories", element:<ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: "wishList", element:<ProtectedRoute> <WishList /> </ProtectedRoute> },
        { path: "productDetails/:id/:category", element:<ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "verify-code", element: <ProtectedResetPass><VerifyCode /> </ProtectedResetPass>},
        { path: "passwordReset", element:<ProtectedResetPassFinal> <PasswordReset /> </ProtectedResetPassFinal>},
        { path: "register", element: <Register /> },
        { path: "products", element:<ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: "checkOut", element:<ProtectedRoute> <CheckOut /> </ProtectedRoute> },
        { path: "allorders", element:<AllOrders> <CheckOut /> </AllOrders> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

function App() {
  
  return (
    <>
    <UserContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>  
          <WishListContextProvider>
            <RouterProvider router={routing}>
            </RouterProvider>
          </WishListContextProvider>
        </CartContextProvider>
            <ReactQueryDevtools/>
      </QueryClientProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
