import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import SingleStock from "./SingleStock";
import { TableFooter } from "@material-ui/core";
import { useGlobalContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";

// Generate Order Data
function createData(id, logo, symbol, name, shares, price, total) {
  return { id, logo, symbol, name, shares, price, total };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

export default function PortfolioStocks() {
  const { cash, portfolio } = useGlobalContext();
  const classes = useStyles();
  const rows = portfolio.map((stock) => {
    const { id, logo, symbol, name, shares, price } = stock;
    let total = parseInt(shares) * price;
    total = parseFloat(total.toFixed(2));
    return createData(id, logo, symbol, name, shares, price, total);
  });
  return (
    <React.Fragment>
      <Title>Assets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Shares</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <SingleStock key={row.id} row={row} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className={classes.root}>
            <TableCell>Cash</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{cash}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}
