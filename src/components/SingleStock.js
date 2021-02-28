import React, { useState, useEffect } from "react";
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
  const [latestPrice, setLatestPrice] = useState(null);

  const stock_quote = async () => {
    try {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${row.symbol}/quote?token={}`);
      const data = await response.json();
      setLatestPrice(data.latestPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (open === true) {
      stock_quote();
    }
  }, [open]);
  return (
    <>
      <TableRow className={classes.root} key={row.id}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img src={row.logo} style={{ width: "45px", height: "auto" }} />
        </TableCell>
        <TableCell>{row.symbol}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.shares}</TableCell>
        <TableCell>${row.price}</TableCell>
        <TableCell align="right">${row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2} textAlign="center">
              <Typography variant="h6" gutterBottom component="div">
                Latest price
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h5">${latestPrice}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-around" p={3}>
              <Link to="./buy" style={{ textDecoration: "none" }}>
                <Button variant="outlined" className={classes.buyBtn} align="left">
                  Buy
                </Button>
              </Link>
              <Link to="./sell" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="secondary" className={classes.sellBtn}>
                  Sell
                </Button>
              </Link>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SingleStock;
