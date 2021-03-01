import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./components/listItems";
import { default as SwitchBtn } from "@material-ui/core/Switch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Link from "@material-ui/core/Link";
import "./App.css";
import Error from "./components/Error";
import Portfolio from "./pages/Portfolio";
import Quote from "./pages/Quote";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import History from "./pages/History";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    // position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingLeft: 60,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState(false);
  const mode = checked ? "dark" : "light";
  const mainColour = checked ? "#BB86FC" : "#1976d2";

  const theme = createMuiTheme({
    palette: {
      type: mode,
      primary: {
        main: mainColour,
      },
      secondary: {
        main: "#CF6679",
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(classes.appBar)}>
            <Toolbar className={classes.toolbar}>
              <IconButton edge="start" color="inherit" aria-label="open drawer" className={clsx(classes.menuButton)}>
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                STOCK TRADING SIMULATOR
              </Typography>
              <SwitchBtn
                // checked={state.checkedB}
                onChange={() => setChecked(!checked)}
                color="secondary"
                name="checkedB"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={() => setOpen(!open)}>{open ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
            </div>
            <List className={classes.center}>{mainListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {/* Pages/sections would be placed here */}
            <Switch>
              <Route exact path="/">
                <Portfolio value={checked} />
              </Route>
              <Route path="/quote">
                <Quote />
              </Route>
              <Route exact path="/buy">
                <Buy />
              </Route>
              <Route exact path="/sell">
                <Sell />
              </Route>
              <Route exact path="/history">
                <History />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
            {/* Pages/sections would be placed here */}
            <Typography variant="overline" display="block" align="center">
              Data provided by <Link href="https://iexcloud.io/">IEX Cloud</Link>
            </Typography>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
