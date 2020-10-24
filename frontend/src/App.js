import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// import Titlebar from "./components/Titlebar";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import Order from "./screens/Order";

function App() {
  return (
    <Router>
      {/* <Titlebar /> */}
      {/* <div style={{ paddingTop: "32px" }}> */}
      <div>
        <Sidebar>
          <Route path="/product/:id" component={Product} />
          <Route path="/order/:id" component={Order} exact />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/shipping" component={Shipping} exact />
          <Route path="/payment" component={Payment} exact />
          <Route path="/placeorder" component={PlaceOrder} exact />
          <Route path="/" component={Home} exact />
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;
