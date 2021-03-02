import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography, CardActions, Link } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Title from "./Title";
import { useGlobalContext } from "../context";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 140,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));

export default function FinNews() {
  const { financialNews } = useGlobalContext();
  const theme = useTheme();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = financialNews.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <React.Fragment>
      <Title>Financial news</Title>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {financialNews.length > 0 &&
          financialNews.map((news, index) => (
            <div key={news.index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card key={news.index} elevation={0} className={classes.root}>
                  <CardMedia component="img" alt="" height={news.multimedia[3].height} image={news.multimedia[3].url} title="" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {news.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {news.abstract}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={news.url} color="primary" underline="none">
                      Learn more
                    </Link>
                  </CardActions>
                </Card>
              ) : null}
            </div>
          ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        style={{ marginBottom: "0" }}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </React.Fragment>
  );
}
