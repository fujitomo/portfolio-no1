import { useEffect, useContext, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@mui/material/Paper";

import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../shared/LoginProvider";
import styles from "./Header.module.css";
import ScrapingConditions from "../../pages/ScrapingConditions";
import { ListProperties } from "../../pages/ListProperties";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HeaderTabs() {
  const classes = useStyles();
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
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="???????????????????????????" {...a11yProps(0)} />
          <Tab label="????????????" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ScrapingConditions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListProperties />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
