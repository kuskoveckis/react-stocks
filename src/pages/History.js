import React from "react";
import { useGlobalContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Grid, Paper, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
}));

const History = () => {
  const classes = useStyles();
  const { history } = useGlobalContext();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid>
        <Paper className={classes.paper}>
          <Typography variant="h5" style={{ marginBottom: "1em" }} color="primary">
            Transactions history
          </Typography>
          {history.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Transaction</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Shares</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((row) => (
                  <TableRow key={row.id}>
                    {/* <TableCell>{row.date}</TableCell> */}
                    <TableCell>{row.action.toUpperCase()}</TableCell>
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shares}</TableCell>
                    <TableCell>${row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <>
              <Typography align="center" style={{ marginBottom: "4rem" }}>
                No transactions history
              </Typography>
            </>
          )}
        </Paper>
      </Grid>
    </Container>
  );
};

export default History;
