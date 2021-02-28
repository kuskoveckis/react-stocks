import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AlertMsg from "../components/AlertMsg";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(4),
  },
}));

const Buy = () => {
  let history = useHistory();
  const classes = useStyles();
  const { buy, alert } = useGlobalContext();
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    buy(symbol, amount);
    setSymbol("");
    setAmount(null);
  };

  const redirect = () => {
    setTimeout(() => {
      if (alert.show === true && alert.severity === "success") {
        history.push("/");
      }
    }, 2000);
  };

  useEffect(() => {
    redirect();
  }, [alert.show]);
  return (
    <Container className={classes.container} maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <TextField
            id="standard-basic"
            label="Symbol"
            style={{ minWidth: "200px", marginBottom: "2rem" }}
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Number of shares"
            type="number"
            style={{ minWidth: "200px", marginBottom: "2rem" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ backgroundColor: "green", color: "white" }}
            className={classes.button}
            startIcon={<MonetizationOnIcon />}
          >
            Buy
          </Button>
        </Grid>
      </form>
      <Grid container alignItems="center" justify="center" style={{ marginTop: "4rem" }}>
        {alert.show && <AlertMsg />}
      </Grid>
    </Container>
  );
};

export default Buy;
