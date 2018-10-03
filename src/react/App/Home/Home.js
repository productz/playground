import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  content: {
    padding: theme.spacing.unit * 3
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    position: "relative",
    bottom: "11em"
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Home(props) {
  const { classes, logo, title, isLoggedIn, onSignUp, onDashboard } = props;

  return (
    <React.Fragment>
      <div id="clouds" className="sky-gradient-09">
        <div className="cloud x1" />
        <div className="cloud x2" />
        <div className="cloud x3" />
        <div className="cloud x4" />
        <div className="cloud x5" />
        <main className={classes.content}>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <img width="600px" height="auto" src={logo} />
                </Grid>
              </Grid>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {title}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    {!isLoggedIn && (
                      <Button
                        onClick={onSignUp}
                        variant="contained"
                        color="primary"
                      >
                        Sign up today!
                      </Button>
                    )}
                  </Grid>
                  <Grid item>
                    {isLoggedIn && (
                      <Button
                        onClick={onDashboard}
                        variant="contained"
                        color="primary"
                      >
                        Go to your Dashboard
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography
          variant="subheading"
          align="center"
          color="textSecondary"
          component="p"
        >
          Module
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
