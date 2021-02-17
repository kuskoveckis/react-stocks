import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import SingleStock from "./SingleStock";

// Generate Order Data
function createData(id, logo, symbol, name, shares, price, total) {
  return { id, logo, symbol, name, shares, price, total };
}

const rows = [
  createData(0, "test", "AAPL", "Apple Inc.", "150", 174.55, 25000),
  createData(1, "test", "GOOGL", "Apple Inc.", "170", 174.55, 25000),
  createData(2, "test", "NTFLX", "Apple Inc.", "190", 174.55, 25000),
];

export default function PortfolioStocks() {
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
      </Table>
    </React.Fragment>
  );
}
