import React from "react";
import { Card, CardItem, Form, Item, Input, Label, Text } from "native-base";

const Register = ({ onProviderAuth, onSubmit, onChange }) => {
  return (
    <Card>
      <CardItem>
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
        <Button type="submit" onClick={onSubmit}>
          Register
        </Button>
      </CardItem>
    </Card>
  );
};
export default Register;
