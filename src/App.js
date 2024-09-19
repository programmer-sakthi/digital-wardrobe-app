// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import AllDresses from "./Pages/All Dresses/AllDresses";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup"
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AddDresses from "./Pages/Add Dresses/AddDresses";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/all-dresses" element={ <Layout>
            <AllDresses />
        </Layout>} />
        <Route path="/add-dresses" element={ <Layout>
            <AddDresses />
        </Layout>} />
      </Routes>
  );
};

export default App;
