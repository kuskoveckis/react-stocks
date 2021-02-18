import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useGlobalContext } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
  },
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
  const [value, setValue] = useState("");
  const classes = useStyles();
  const { quote } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    quote(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Stock symbol"
        inputProps={{ "aria-label": "search stock symbol" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" color="primary" variant="contained" className={classes.btn}>
        Search
      </Button>
    </form>
  );
};

export default Search;
