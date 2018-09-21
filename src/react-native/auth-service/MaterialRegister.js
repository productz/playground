import React from "react";
import {
  Card,
  CardItem,
  Form,
  Item,
  Input,
  Label,
  Text,
  Picker,
  Icon
} from "native-base";

// Synchronous validation
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
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
    name: "confirm-password",
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

const Register = ({ onProviderAuth, onSubmit, onChange }) => {
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
                    <Item picker>
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: undefined }}
                        placeholder={field.placeholder}
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        onValueChange={value =>
                          setFieldValue(field.name, value)
                        }
                      >
                        {field.items.map(item => {
                          <Picker.Item label={item} value={item} />;
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
      <Button type="submit" onClick={onSubmit}>
        Register
      </Button>
    </React.Fragment>
  );
};
export default Register;
