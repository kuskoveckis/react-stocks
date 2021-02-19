import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StockQuote from "../components/StockQuote";
import StockQuoteChart from "../components/StockQuoteChart";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
    height: 440,
    marginBottom: "2rem",
  },
}));

const StockQuoteCard = () => {
  const { isLoading } = useGlobalContext();
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <StockQuote />
      <StockQuoteChart />
    </Paper>
  );
};

export default StockQuoteCard;
