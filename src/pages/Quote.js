import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Search from "../components/Search";
import StockQuote from "../components/StockQuote";
import StockQuoteChart from "../components/StockQuoteChart";
import News from "../components/News";
import { Typography } from "@material-ui/core";

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
    alignItems: "center",
    height: 440,
    marginBottom: "2rem",
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    display: "flex",
    margin: "0 auto",
    overflow: "auto",
    maxWidth: 600,
    marginBottom: "2rem",
  },
  margin: {
    marginTop: "6rem",
  },
}));

const Quote = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container className={classes.container} maxWidth="lg">
      {/* search form */}
      <Grid>
        <Paper component="form" className={classes.search}>
          <Search />
        </Paper>
      </Grid>
      {/* search results */}
      <Grid>
        <Paper className={classes.paper}>
          <StockQuote />
          <StockQuoteChart />
        </Paper>
      </Grid>
      <Grid>
        <Paper>
          <News />
        </Paper>
      </Grid>
      <Typography variant="overline" align="center" display="block" className={classes.margin}>
        Data provided by IEX Cloud
      </Typography>
    </Container>
  );
};

export default Quote;
