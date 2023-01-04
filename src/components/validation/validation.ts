import * as yup from "yup";

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required("必須だよ")
    .email("正しいメールアドレス入力してね"),
  name: yup.string().required("必須だよ"),
  password: yup
    .string()
    .required("必須だよ")
    .min(6, "少ないよ")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      "パスワード弱いよ"
    ),
});
