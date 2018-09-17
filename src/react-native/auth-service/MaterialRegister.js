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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const Register = ({ onProviderAuth, onSubmit, onChange }) => {
  return (
    <Card style={{ marginTop: "1em" }}>
      <CardHeader title="Register" />
      <CardContent>
        <TextField
          id="first-name"
          label="Enter your First name"
          onChange={event => onChange("firstname", event.target.value)}
          margin="normal"
          onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
        />
        <br />
        <TextField
          id="last-name"
          label="Enter your Last name"
          onChange={event => onChange("lastname", event.target.value)}
          margin="normal"
          onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
        />
        <br />
        <TextField
          id="email"
          label="Enter your Email"
          type="email"
          onChange={event => onChange("email", event.target.value)}
          margin="normal"
          onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
        />
        <br />
        <TextField
          id="password"
          label="Enter password"
          type="password"
          onChange={event => onChange("password", event.target.value)}
          margin="normal"
          onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
        />
        <br />
        <Button label="Submit" primary={true} onClick={onSubmit}>
          Register
        </Button>
      </CardContent>
    </Card>
  );
};
export default Register;
