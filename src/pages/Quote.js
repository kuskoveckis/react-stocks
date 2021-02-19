import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Search from "../components/Search";
import News from "../components/News";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import StockQuoteCard from "../components/StockQuoteCard";

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
  const { render, isLoading, news } = useGlobalContext();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container className={classes.container} maxWidth="lg">
      {/* search form */}
      <Grid>
        <Paper className={classes.search}>
          <Search />
        </Paper>
      </Grid>
      {/* search results */}
      {render && (
        <Grid>
          {isLoading ? (
            <Grid container spacing={4} justify="center" alignItems="center" style={{ marginTop: "6rem", marginBottom: "12rem" }}>
              <Loading />
            </Grid>
          ) : (
            <StockQuoteCard />
          )}
        </Grid>
      )}
      {/* news */}
      {render && (
        <Grid container direction="row" spacing={4} justify="center" alignItems="center">
          {isLoading ? (
            <Loading />
          ) : (
            news.map((news_card) => {
              return <News key={news_card.datetime} {...news_card} />;
            })
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Quote;
