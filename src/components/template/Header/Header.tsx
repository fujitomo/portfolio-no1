import { useEffect, useContext, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../shared/LoginProvider";
import styles from "./Header.module.css";

export default function Header() {
  const [value, setValue] = useState(0);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    var localLogin = localStorage.getItem("login");
    if (localLogin || login) {
      navigate("/");
    }
  }, [login, navigate]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          className={styles.selectEmpty}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        ></Tabs>
      </AppBar>
    </div>
  );
}
