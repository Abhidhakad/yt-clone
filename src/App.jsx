import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";

const App = () => {
  const accessToken = localStorage.getItem("access_token");
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={accessToken? <Body/> :< Login />} />
          {/* <Route path="/" element={<Body />} />/ */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
