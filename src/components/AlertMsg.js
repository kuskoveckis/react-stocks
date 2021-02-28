import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertMsg = () => {
  const classes = useStyles();
  const { alert } = useGlobalContext();
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={alert.severity}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.msg}
      </Alert>
    </div>
  );
};

export default AlertMsg;
