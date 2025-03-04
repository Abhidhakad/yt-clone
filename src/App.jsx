import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux"
import { store } from "./redux/store";


const App = () => {
  const accessToken = localStorage.getItem("access_token");
  

  return (
   <>
   <Provider store={store} >
     <Router>
      <Routes>
        <Route path="/" element={accessToken? <Body /> : <Login/> } />
        
      </Routes>
     </Router>
   </Provider>
    </>
  );
};

export default App;
