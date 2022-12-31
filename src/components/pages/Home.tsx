import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useContext } from "react";
import HeaderTabs from "../template/TabHeader";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../shared/LoginProvider";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const { login, setLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const testLogin = () => {
    setLogin(false);
    localStorage.clear();
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("login");
    if (!isLogin && !login) navigate("/login");
  }, [login, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <HeaderTabs />
    </ThemeProvider>
  );
}
