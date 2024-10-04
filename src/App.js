// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./Layout/Layout";
import AddDresses from "./Pages/Add Dresses/AddDresses";
import AllDresses from "./Pages/All Dresses/AllDresses";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import Laundry from "./Pages/Laundry/Laundry";
import Outfit from "./Pages/Outfits/Outfit";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/all-dresses"
          element={
            <Layout>
              <AllDresses />
            </Layout>
          }
        />
        <Route
          path="/add-dresses"
          element={
            <Layout>
              <AddDresses />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/laundry"
          element={
            <Layout>
              <Laundry />
            </Layout>
          }
        />
        <Route
          path="/outfits"
          element={
            <Layout>
              <Outfit />
            </Layout>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
