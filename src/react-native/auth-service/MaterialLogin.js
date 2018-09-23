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

export const Login = ({ onChange, onSubmit, onProviderAuth, onRegister }) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values, actions);
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
          isSubmitting,
          setFieldValue,
          validateForm,
          submitForm
        }) => {
          return (
            <Form>
              {fields.map((field, index) => {
                let hasError =
                  errors[field.name] && errors[field.name].length > 0;
                return (
                  <Item
                    key={field.name}
                    floatingLabel
                    success={!hasError}
                    error={hasError}
                  >
                    <Label>{field.name}</Label>
                    <Input
                      id={field.name}
                      label={field.placeholder}
                      type={field.type}
                      onChangeText={text => {
                        setFieldValue(field.name, text);
                      }}
                      // onBlur={handleBlur}
                      required={field.required}
                    />
                    {errors[field.name] &&
                      touched[field.name] && <Text>{errors[field.name]}</Text>}
                  </Item>
                );
              })}
              <Button
                onPress={event => {
                  handleSubmit(event);
                }}
                // disabled={isSubmitting}
              >
                <Text>Login</Text>
              </Button>
            </Form>
          );
        }}
      />
      <Button block secondary onPress={onRegister}>
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
