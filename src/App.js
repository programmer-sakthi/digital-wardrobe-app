// App.js
import React from "react";
import Layout from "./Layout/Layout";
import './App.css'
import AllDresses from "./Pages/All Dresses/AllDresses";
const App = () => {
  return (
    <div className="App">
        <Layout>
            <AllDresses />
        </Layout>
    </div>
  );
};

export default App;
