import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useGlobalContext } from "../context";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const date = new Date();
const day = date.getDate();
const year = date.getFullYear();
const month = date.getMonth();

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function PortfolioValue() {
  const classes = useStyles();
  const { portfolio, cash } = useGlobalContext();
  const stocks_value = portfolio.reduce((acc, stock) => {
    const { shares, price } = stock;
    let stock_total = parseInt(shares) * price;
    // stock_total = parseFloat(stock_total.toFixed(2));
    acc += stock_total;
    return acc;
  }, 0);
  console.log(stocks_value);
  const portfolio_value = stocks_value + cash;
  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4" style={{ color: "white" }}>
        ${portfolio_value}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} style={{ color: "white" }}>
        on {day} {months[month]}, {year}
      </Typography>
    </React.Fragment>
  );
}
