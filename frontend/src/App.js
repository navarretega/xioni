import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Titlebar from "./components/Titlebar";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Profile from "./screens/Profile";

function App() {
  return (
    <Router>
      <Titlebar />
      <div style={{ paddingTop: "32px" }}>
        <Sidebar>
          <Route path="/product/:id" component={Product} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/" component={Home} exact />
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;
