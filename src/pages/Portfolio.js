import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FinNews from "../components/FinNews";
import PortfolioValue from "../components/PortfolioValue";
import PortfolioStocks from "../components/PortfolioStocks";
import "../App.css";

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
    [theme.breakpoints.down("xs")]: {
      height: 250,
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 250,
    },
    [theme.breakpoints.up("md")]: {
      height: 450,
    },
    [theme.breakpoints.up("lg")]: {
      height: 410,
    },
  },
  newsHeight: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 410,
    [theme.breakpoints.down("md")]: {
      height: 450,
    },
  },
}));

const Portfolio = ({ value }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Portfolio Value */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper
            className={`${fixedHeightPaper} `}
            style={
              value
                ? { backgroundImage: "linear-gradient(-225deg, #65379b 0%, #886aea 53%, #6457c6 100%)" }
                : { backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)" }
            }
          >
            <PortfolioValue />
          </Paper>
        </Grid>
        {/* Portfolio Financial News */}
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={classes.newsHeight}>
            <FinNews />
          </Paper>
        </Grid>
        {/* Portfolio stocks assets */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PortfolioStocks />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio;
