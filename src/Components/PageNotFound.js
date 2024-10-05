// Pages/PageNotFound/PageNotFound.js
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="icon-container">
        <FaExclamationTriangle className="warning-icon" />
      </div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
