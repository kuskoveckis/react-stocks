import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AlertMsg from "../components/AlertMsg";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(4),
  },
}));

const Sell = () => {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("test");
  };
  return (
    <Container className={classes.container} maxWidth="lg">
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <FormControl className={classes.formControl} style={{ minWidth: "200px", marginBottom: "2rem" }}>
            <InputLabel id="demo-simple-select-label">Stock</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>AAPL</MenuItem>
              <MenuItem value={20}>GOOGL</MenuItem>
              <MenuItem value={30}>NTFLX</MenuItem>
            </Select>
          </FormControl>
          <TextField id="standard-basic" label="Number of shares" style={{ minWidth: "200px", marginBottom: "2rem" }} />
          <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<AttachMoneyIcon />}>
            Sell
          </Button>
        </Grid>
      </form>
      <Grid container alignItems="center" justify="center" style={{ marginTop: "4rem" }}>
        <AlertMsg />
      </Grid>
    </Container>
  );
};

export default Sell;
