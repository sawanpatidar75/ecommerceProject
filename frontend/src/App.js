import './App.css';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import webFont from "webfontloader";
import React, { useState, useEffect } from 'react';
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home"
import ProductDetails from './component/Product/ProductDetails';
import Products from "./component/Product/Products"
import Search from "./component/Product/Search";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userActions';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from 'axios';
import Payment from './component/Cart/Payment';
import ElementsLayout from "./component/Cart/ElementsLayout.js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import NotFound from "./component/NotFound/NotFound.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")

  const isAdmin = false;

  async function getStripeApiKey() {
    const { data } = await axios.post("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);

  };

  // const { error, isUpdated, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
    store.dispatch(loadUser());

    getStripeApiKey();

  }, []);

  window.addEventListener("contextmenu",(e) => e.preventDefault())

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />

          <Route exact path="/accounts" element={isAuthenticated === false ? <Navigate replace to="/login" /> : <Profile />} />;
          <Route exact path="/me/update" element={isAuthenticated === false ? <Navigate replace to="/login" /> : <UpdateProfile />} />;
          <Route exact path="/password/update" element={isAuthenticated === false ? <Navigate replace to="/login" /> : <UpdatePassword />} />;
          <Route exact path="/password/forgot" element={<ForgotPassword />} />;
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />;
          <Route exact path='/search' element={<Search />} />

          <Route exact path='/login' element={<LoginSignUp />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/shipping' element={isAuthenticated === false ? <Navigate replace to="/login" /> : <Shipping />} />

          <Route
            element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
          >
            {/* {stripeApiKey && ( */}

            <Route path="/process/payment" element={isAuthenticated === false ? <Navigate replace to="/login" /> : <Payment />} />
            {/* )} */}

          </Route>
          <Route exact path='/success' element={isAuthenticated === false ? <Navigate replace to="/login" /> : <OrderSuccess />} />
          <Route exact path='/orders' element={isAuthenticated === false ? <Navigate replace to="/login" /> : <MyOrders />} />


          <Route exact path='/order/confirm' element={isAuthenticated === false ? <Navigate replace to="/login" /> : <ConfirmOrder />} />
          <Route exact path='/order/:id' element={isAuthenticated === false ? <Navigate replace to="/login" /> : <OrderDetails />} />

          <Route exact isAdmin={true} path='/admin/dashboard' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <Dashboard />} />
          <Route exact isAdmin={true} path='/admin/products' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <ProductList />} />
          <Route exact isAdmin={true} path='/admin/product' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <NewProduct />} />
          <Route exact isAdmin={true} path='/admin/product/:id' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <UpdateProduct />} />
          <Route exact isAdmin={true} path='/admin/orders' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <OrderList />} />
          <Route exact isAdmin={true} path='/admin/order/:id' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <ProcessOrder />} />
          <Route exact isAdmin={true} path='/admin/users' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <UsersList />} />
          <Route exact isAdmin={true} path='/admin/user/:id' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <UpdateUser />} />
          <Route exact isAdmin={true} path='/admin/reviews' element={isAuthenticated === false || (isAdmin === true && user.role !== "admin") ? <Navigate replace to="/login" /> : <ProductReviews />} />

          <Route path='*' element={<NotFound />} />
          {/* {stripeApiKey && ( */}
          {/* <Route
              path="/process/payment"
              element={(
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            /> */}
          {/* )} */}

        </Routes>
        {/* <ProtectedRoute exact path='/account' element={<Profile />} /> */}

        <Footer />
      </Router>
    </>
  );


}

export default App;
