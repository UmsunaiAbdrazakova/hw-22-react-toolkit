import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = password.length >= 8;

    if (isValidEmail && isValidPassword) {
      dispatch(login());
      setLoggedIn(true);
    } else {
      alert("Неверные учетные данные");
    }
  };

  return (
    <div>
      <h1>Вход в систему:</h1>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Войти</Button>
      {loggedIn && <Navigate to="/todos" />}
    </div>
  );
};

export default Login;
