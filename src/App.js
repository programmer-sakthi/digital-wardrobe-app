// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import AllDresses from "./Pages/All Dresses/AllDresses";
import Login from "./Pages/Login/Login";
// import SampleNav from "./Navigation/SampleNav";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Layout>
          <AllDresses />
        </Layout> */}
        <Login />
      </div>
    </BrowserRouter>
  );
};

export default App;
