import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useAuthcontext } from "./context/auth.context";

const App = () => {
  const { authUser } = useAuthcontext();

  return (
    <div className="flex justify-center items-center w-full">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </div>
  );
};

export default App;
