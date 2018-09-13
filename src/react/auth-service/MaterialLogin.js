import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

export const Login = ({
  onChange,
  onSubmit,
  onProviderAuth,
  username,
  password,
  classes
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <TextField
          id="username"
          label="username"
          onChange={event => onChange("username", event.target.value)}
          margin="normal"
          onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
        />
        <TextField
          id="password"
          label="password"
          onChange={event => onChange("password", event.target.value)}
          margin="normal"
          onKeyPress={event => {
            event.key === "Enter" ? onSubmit() : "";
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onSubmit}>
          Login
        </Button>
        <Button size="small" color="secondary">
          Register
        </Button>
      </CardActions>
      <div>
        <Button onClick={() => onProviderAuth("google")} size="large" fullWidth>
          Login with google
        </Button>
        <Button
          onClick={() => onProviderAuth("facebook")}
          size="large"
          fullWidth
        >
          Login with facebook
        </Button>
        <Button
          onClick={() => onProviderAuth("twitter")}
          size="large"
          fullWidth
        >
          Login with twitter
        </Button>
      </div>
    </Card>
  );
};
export default withStyles(styles)(Login);
