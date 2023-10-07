import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { productData } from "./api/api";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import { ScrollRestoration } from "react-router-dom";
import Cheackout from "./pages/Cheackout";
import Resgistration from "./pages/Resgistration";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/checkout" element={<Cheackout />}></Route>
        <Route path="/registration" element={<Resgistration />}></Route>
      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
