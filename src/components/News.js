import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 245,
    minHeight: 420,
    maxHeight: 420,
  },
});

const News = ({ image, headline, summary, url }) => {
  const classes = useStyles();
  return (
    <Grid item md={6} lg={4}>
      <Card className={classes.root}>
        <CardMedia component="img" alt="" height="140" image={image} title="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {headline.substring(0, 60)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary.substring(0, 200)} ...
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={url} color="primary" underline="none">
            Learn more
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default News;
