import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PageNotFound from "./Components/PageNotFound";
import ProtectedRoute from "./Components/ProtectedRoute";
import { auth } from "./config/firebase";
import Layout from "./Layout/Layout";
import AddDresses from "./Pages/Add Dresses/AddDresses";
import AllDresses from "./Pages/All Dresses/AllDresses";
import Laundry from "./Pages/Laundry/Laundry";
import Login from "./Pages/Login/Login";
import Outfit from "./Pages/Outfits/Outfit";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import ResetPassword from "./Pages/Reset Password/ResetPassword";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/all-dresses"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <AllDresses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-dresses"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <AddDresses />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/laundry"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Laundry />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/outfits"
          element={
            <ProtectedRoute user={user}>
              <Layout>
                <Outfit />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} /> {/* Catch-all route */}
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
