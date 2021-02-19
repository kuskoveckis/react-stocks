import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "2rem",
  },
  border: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

const StockQuote = () => {
  const { stock_quote_data } = useGlobalContext();

  const classes = useStyles();
  return (
    <>
      <Table size="medium" className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price per share</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.border}>
            <TableCell align="center">{stock_quote_data.symbol}</TableCell>
            <TableCell align="center">{stock_quote_data.companyName}</TableCell>
            <TableCell align="center">{stock_quote_data.latestPrice} $</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default StockQuote;
