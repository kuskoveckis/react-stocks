import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  buyBtn: {
    borderColor: "green",
    color: "green",
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
  },
  sellBtn: {
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  },
}));

const SingleStock = (props) => {
  const { row } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.logo}</TableCell>
        <TableCell>{row.symbol}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.shares}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2} textAlign="center">
              <Typography variant="h6" gutterBottom component="div">
                Current price
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h5">$125.35</Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" p={3}>
              <Link to="./buy" style={{ textDecoration: "none" }}>
                <Button variant="outlined" className={classes.buyBtn} align="left">
                  Buy
                </Button>
              </Link>
              <Button variant="outlined" color="secondary" className={classes.sellBtn}>
                Sell
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SingleStock;
