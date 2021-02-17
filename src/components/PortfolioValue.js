import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const date = new Date();
const day = date.getDate();
const year = date.getFullYear();
const month = date.getMonth();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function PortfolioValue() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Portfolio Value</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {day} {months[month]}, {year}
      </Typography>
    </React.Fragment>
  );
}
