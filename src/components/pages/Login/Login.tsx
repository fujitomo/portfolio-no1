import { useEffect, useContext, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Suumo_Title from "../../../images/Suumo_Title.png";
import styles from "./Login.module.css";
import { LoginContext } from "../../shared/LoginProvider";
import { useNavigate } from "react-router-dom";
import Header from "../../template/Header/Header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const theme = createTheme();

export default function Login() {
  const { login, setLogin } = useContext(LoginContext);

  //ログイン時ページ遷移用
  const navigate = useNavigate();
  useEffect(() => {
    var localLogin = localStorage.getItem("login");
    if (localLogin || login) {
      navigate("/");
    }
  }, [login, navigate]);

  //TODO バリデーションをフックに分離する？

  //フォーム送信時の処理;
  const onSubmit: SubmitHandler<SampleFormInput> = (data: any) => {
    // バリデーションチェックOK！なときに行う処理を追加
    setLogin(true);
    localStorage.setItem("login", "true");
  };

  // フォームの型
  interface SampleFormInput {
    email: string;
    name: string;
    password: string;
  }

  // バリデーションルール
  const schema = yup.object({
    email: yup
      .string()
      .required("必須だよ")
      .email("正しいメールアドレス入力してね"),
    password: yup
      .string()
      .required("必須だよ")
      .min(6, "少ないよ")
      //TODO　.$が必要な理由を後で調べる
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
        "パスワードには大文字、小文字、数字、記号のすべてを入れてください。"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema),
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Suumo_Title} alt="架空の株式会社 Dummy" />
          <Box
            component="form"
            //onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              inputProps={{ maxLength: 40 }}
              label="メールアドレス"
              type="email"
              {...register("email")}
              error={"email" in errors}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              required
              autoComplete="current-password"
              inputProps={{ maxLength: 63 }}
              label="パスワード"
              type="password"
              {...register("password")}
              error={"password" in errors}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="パスワードを保存しますか？"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              ログイン
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  パスワードを忘れましたか？
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
