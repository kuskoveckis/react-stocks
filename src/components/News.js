import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "@material-ui/core";
import { useGlobalContext } from "../context";

const useStyles = makeStyles({
  root: {
    minWidth: 245,
    minHeight: 410,
  },
});

const News = ({ image, headline, summary, url }) => {
  const classes = useStyles();
  const { news } = useGlobalContext();
  return (
    <Grid item md={6} lg={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia component="img" alt="Contemplative Reptile" height="140" image={image} title="Contemplative Reptile" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {headline.substring(0, 100)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {summary.substring(0, 250)}
            </Typography>
          </CardContent>
        </CardActionArea>
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
