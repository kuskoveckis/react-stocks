import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

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
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="error">
        <AlertTitle>Stock symbol is not correct</AlertTitle>
        Please try again
      </Alert>
    </div>
  );
};

export default AlertMsg;
