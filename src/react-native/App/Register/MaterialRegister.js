import React from "react";
import {
  Form,
  Item,
  Input,
  Label,
  Text,
  Picker,
  Icon,
  Button
} from "native-base";
import * as Yup from "yup";
import { Formik } from "formik";

// Synchronous validation
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords do not match"
  )
});

let fields = [
  {
    type: "text",
    name: "username",
    placeholder: "Username",
    required: true
  },
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
  },
  {
    type: "password",
    name: "confirmPassword",
    placeholder: "Password",
    required: true
  },
  {
    type: "dropdown",
    name: "gender",
    items: ["male", "female"],
    placeholder: "Gender",
    required: true
  }
];

const Register = ({ onProviderAuth, onSubmit, onChange, gender }) => {
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
        validationSchema={RegisterSchema}
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
                if (field.type === "dropdown") {
                  return (
                    <Item key={field.name} picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        placeholder={field.placeholder}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={value => {
                          setFieldValue(field.name, value);
                          onChange(field.name, value);
                        }}
                        selectedValue={gender}
                        required={field.required}
                      >
                        {field.items.map(item => {
                          return (
                            <Picker.Item key={item} label={item} value={item} />
                          );
                        })}
                      </Picker>
                    </Item>
                  );
                }
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
                        onChange(field.name, text);
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
                <Text>Register</Text>
              </Button>
            </Form>
          );
        }}
      />
      <Button onPress={() => onProviderAuth("google")} block secondary>
        <Text>Login with Google</Text>
      </Button>
      <Button onPress={() => onProviderAuth("facebook")} block secondary>
        <Text>Login with facebook</Text>
      </Button>
      <Button onPress={() => onProviderAuth("twitter")} block secondary>
        <Text>Login with twitter</Text>
      </Button>
    </React.Fragment>
  );
};
export default Register;
