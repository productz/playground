import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Body
} from "native-base";

// Synchronous validation
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

let fields = [
  {
    type: "email",
    name: "email",
    placeholder: "Email",
    required: true
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
    required: true
  }
];

export const Login = ({
  onChange,
  onSubmit,
  onProviderAuth,
  onRegister
}) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          onSubmit(values)
            .then(() => {
              actions.setSubmitting(false);
            })
            .catch(err => {});
        }}
        validationSchema={LoginSchema}
        render={({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {fields.map((field, index) => {
                return (
                  <Item floatingLabel>
                    <Label>{field.name}</Label>
                    <Input
                      id={field.name}
                      label={field.placeholder}
                      type={field.type}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      margin="normal"
                      required={field.required}
                      onKeyPress={event =>
                        event.key === 13 ? handleSubmit(event) : ""
                      }
                    />
                    {errors[field.name] &&
                      touched[field.name] && <Text>{errors[field.name]}</Text>}
                  </Item>
                );
              })}
              <Button onClick={onSubmit} type="submit" disabled={isSubmitting}>
                <Text>Login</Text>
              </Button>
            </Form>
          );
        }}
      />
      <Button block secondary onClick={onRegister}>
        <Text>You don't have an account? register here</Text>
      </Button>
      <Button onClick={() => onProviderAuth("google")} block secondary>
        <Text>Login with Google</Text>
      </Button>
      <Button onClick={() => onProviderAuth("facebook")} block secondary>
        <Text>Login with facebook</Text>
      </Button>
      <Button onClick={() => onProviderAuth("twitter")} block secondary>
        <Text>Login with twitter</Text>
      </Button>
    </React.Fragment>
  );
};

export default Login;
