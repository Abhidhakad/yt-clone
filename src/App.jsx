import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Channel from "./components/Channel";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";

const App = () => {
  const accessToken = localStorage.getItem("access_token");

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={accessToken? <Body/> : <Login/>}>
          <Route index element={<Home />} />
          <Route path="/:userId" element={<Channel />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
