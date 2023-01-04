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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";

export default function ScrapingConditions() {
  const numberRegExp = /^[0-9]+$/;

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

    // let tmp = [...conditionBoxs];
    // tmp.splice(index, 1);
    // setConditionBoxs(tmp);
    // console.log(conditionBoxs);
    reset({
      name: "",
      items: [{ keyword: "", property_price_min: 0, property_price_max: 0 }],
    });
  };

  // フォームの型
  interface IFormInput {
    name: string;
    items: {
      keyword: string;
      property_price_min: number;
      property_price_max: number;
    }[];
  }

  // バリデーションルール
  // const schema = yup.object({
  //   property_price_min: yup
  //     .number()
  //     .typeError("数値を入力してください。")
  //     .required("必須です。"),
  //   property_price_max: yup
  //     .number()
  //     .typeError("数値を入力してください。")
  //     .required("必須です。"),
  // });

  type FormValues = {
    name: string;
    items: {
      keyword: string;
      property_price_min: number;
      property_price_max: number;
    }[];
  };

  const {
    register, // register 関数はinput/select の Ref とバリデーションルールを React Hook Form に登録 (register)
    handleSubmit, // handleSubmit 関数はバリデーションに成功するとフォームデータを渡す
    formState: { errors }, // バリデーションとエラーメッセージで登録するとエラーメッセージが返される
    control,
    reset, // reset 関数はフォーム内のフィールドの値とエラーをリセットできる
  } = useForm<IFormInput | FormValues>({
    // resolver: yupResolver(schema),
    // defaultValues を省略可能な引数として渡してフォーム全体のデフォルト値を設定し、fields 配列に値を格納
    // defaultValues はカスタムフック内にキャッシュされる
    // defaultValues は reset API でリセットできる
    defaultValues: {
      name: "",
      items: [
        { keyword: "", property_price_min: 0, property_price_max: 9999999999 },
      ],
    },

    // blur イベントからバリデーションがトリガーされる
    mode: "onBlur",
  });

  // フォーム送信時の処理
  const onSubmit: SubmitHandler<IFormInput | FormValues> = (data) => {
    // バリデーションチェックOK！なときに行う処理を追加
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const boxItems = fields.map((field, index) => (
    <Box key={field.id} className={styles.boxStyles}>
      インデックス：{index}
      <Grid item m={2}>
        <TextField
          id="standard-helperText"
          label="キーワードから探す"
          defaultValue=""
          variant="standard"
          color="primary"
          {...register(`items.${index}.keyword`, {
            required: "⚠必須項目です",
          })}
          fullWidth
        />

        <ErrorMessage
          errors={errors}
          name={`items.${index}.keyword`}
          //message="⚠ 単価欄に1~10000の数字を入力してください"
          render={({ message }) => (
            <div className={styles.errorStyles}>{message}</div>
          )}
          as="div"
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
            variant="standard"
            color="primary"
            inputProps={{
              maxLength: 10,
              style: { textAlign: "right" },
            }}
            {...register(`items.${index}.property_price_min`, {
              required: "⚠必須項目です",
              pattern: {
                value: numberRegExp,
                message: "⚠整数で入力して下さい",
              },
            })}
            //error={"property_price_min" in errors}
            // helperText={errors.property_price_min?.message}
          />
          <ErrorMessage
            errors={errors}
            name={`items.${index}.property_price_min`}
            //message="⚠ 単価欄に1~10000の数字を入力してください"
            render={({ message }) => (
              <div className={styles.errorStyles}>{message}</div>
            )}
            as="div"
          />
        </Grid>
        <Grid item>
          <TextField
            id="standard-helperText"
            label="物件価格（最高）"
            defaultValue="999999999"
            variant="standard"
            color="primary"
            inputProps={{
              maxLength: 10,
              style: { textAlign: "right" },
            }}
            {...register(`items.${index}.property_price_max`, {
              required: "⚠必須項目です",
              pattern: {
                value: numberRegExp,
                message: "⚠整数で入力して下さい",
              },
            })}
            //error={`items.${index}.property_price_max` in errors}
            //helperText={errors.property_price_max?.message}
          />
          <ErrorMessage
            errors={errors}
            name={`items.${index}.property_price_max`}
            //smessage="⚠ 単価欄に1~10000の数字を入力してください"
            render={({ message }) => (
              <div className={styles.errorStyles}>{message}</div>
            )}
            as="div"
          />
        </Grid>
        <Grid item className={styles.buttonPosition}>
          <Button
            variant="contained"
            className={styles.buttonStyles}
            onClick={handleSubmit(onSubmit)}
          >
            更新
          </Button>
          <Button
            variant="contained"
            className={styles.buttonStyles}
            color="error"
            onClick={() => remove(index)}
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
        <Typography component="span">スクレイピング条件</Typography>
      </Grid>
      <Grid container m={2} className={styles.grid}>
        {boxItems}
        <Grid container className={styles.addIcon}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            //onClick={addConditionBox}
            onClick={() =>
              append({
                keyword: "",
                property_price_min: 0,
                property_price_max: 999999999,
              })
            }
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}
