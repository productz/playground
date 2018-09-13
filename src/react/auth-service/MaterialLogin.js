import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
export const Login = ({ onChange, onSubmit, onProviderAuth }) => {
  return (
    <div>
      <TextField
        hintText="Enter your Username"
        floatingLabelText="Username"
        onChange={(event, newValue) => onChange("username", newValue)}
      />
      <br />
      <TextField
        type="password"
        hintText="Enter your Password"
        floatingLabelText="Password"
        onChange={(event, newValue) => onChange("password", newValue)}
      />
      <br />
      <Button label="Submit" primary={true} onClick={event => onSubmit()} />
    </div>
  );
};

export default Login;
