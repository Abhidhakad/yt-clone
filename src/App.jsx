import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Body from "./components/Body";

const App = () => {
  const accessToken = localStorage.getItem("access_token");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/" element={<Home />}>
            <Route index element={<Body />} />
            <Route path=":userId" element={<Channel />} />
        </Route>
        <Route path="*" element={accessToken ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
