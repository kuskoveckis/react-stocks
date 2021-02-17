import React from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    flex: 1,
    paddingLeft: "15px",
  },
  btn: {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    padding: "10px 25px",
  },
}));

const Search = () => {
  const classes = useStyles();
  return (
    <>
      <InputBase className={classes.input} placeholder="Stock symbol" inputProps={{ "aria-label": "search stock symbol" }} />
      <Button color="primary" variant="contained" className={classes.btn}>
        Search
      </Button>
    </>
  );
};

export default Search;
