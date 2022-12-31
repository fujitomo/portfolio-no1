import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../shared/LoginProvider";
import { Fab, Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./ScrapingConditions.module.css";

export default function ScrapingConditions() {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const [conditionBoxs, setConditionBoxs] = useState([["test1", 0, 99999]]);

  useEffect(() => {
    let isLogin = localStorage.getItem("login");
    if (!isLogin && !login) navigate("/login");
  }, [login, navigate]);

  const addConditionBox = () => {
    let tmp = [...conditionBoxs, ["testPlus", 0, 99999]];
    setConditionBoxs(tmp);
    console.log(conditionBoxs);
  };

  const updateConditionBox = (id: string | number) => {
    // let tmp = [...conditionBoxs, ["testPlus", 0, 99999]];
    // tmp.splice(tmp.indexOf(id), 1);
    // setConditionBoxs(tmp);
    // console.log(conditionBoxs);
  };

  const deleteConditionBox = (index: number) => {
    console.log(index);

    let tmp = [...conditionBoxs];
    tmp.splice(index, 1);
    setConditionBoxs(tmp);
    console.log(conditionBoxs);
  };

  const boxItems = conditionBoxs.map((box, index) => (
    <Box className={styles.boxStyles}>
      インデックス：{index}
      <Grid item m={2}>
        <TextField
          id="standard-helperText"
          label="キーワードから探す"
          defaultValue={box[0]}
          helperText=""
          variant="standard"
          color="primary"
          fullWidth
        />
      </Grid>
      <Grid
        container
        spacing={2}
        m={0}
        mt={4}
        className={styles.buttonPosition}
      >
        <Grid item>
          <TextField
            id="standard-helperText"
            label="物件価格（最低）"
            defaultValue="0"
            helperText=""
            variant="standard"
            color="primary"
          />
        </Grid>
        <Grid item>
          <TextField
            id="standard-helperText"
            label="物件価格（最高）"
            defaultValue="999999999"
            helperText=""
            variant="standard"
            color="primary"
          />
        </Grid>
        <Grid item className={styles.buttonPosition}>
          <Button variant="contained" className={styles.buttonStyles}>
            更新
          </Button>
          <Button
            variant="contained"
            className={styles.buttonStyles}
            color="error"
            onClick={() => deleteConditionBox(index)}
          >
            削除
          </Button>
        </Grid>
      </Grid>
    </Box>
  ));

  return (
    <>
      <Grid container m={2}>
        <Typography variant="h6">スクレイピング条件</Typography>
      </Grid>
      <Grid container m={2} className={styles.grid}>
        {boxItems}
        <Grid container className={styles.addIcon}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={addConditionBox}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}
