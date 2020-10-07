import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Titlebar from "./components/Titlebar";
import Sidebar from "./components/Sidebar";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/Cart";

function App() {
  return (
    <Router>
      <Titlebar />
      <div style={{ paddingTop: "32px" }}>
        <Sidebar>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={Product} />
          <Route path="/cart/:id?" component={Cart} />
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;
