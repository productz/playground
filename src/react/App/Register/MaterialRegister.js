import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

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
    name: "name",
    placeholder: "Name",
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
    required: false
  }
];

export const Register = ({ onChange, onSubmit, onProviderAuth, classes }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="headline">Register</Typography>
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
              isSubmitting
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {fields.map((field, index) => {
                    return (
                      <div key={index}>
                        <TextField
                          id={field.name}
                          label={field.placeholder}
                          type={field.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maegin="normal"
                          required={field.required}
                          onKeyPress={event =>
                            event.key === 13 ? handleSubmit(event) : ""
                          }
                        />
                        {errors[field.name] &&
                          touched[field.name] && (
                            <div>{errors[field.name]}</div>
                          )}
                      </div>
                    );
                  })}
                  <Button
                    size="small"
                    color="primary"
                    onClick={onSubmit}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </form>
              );
            }}
          />
          <div>
            <Button
              onClick={() => onProviderAuth("google")}
              size="large"
              fullWidth
            >
              Register with Google
            </Button>
            <Button
              onClick={() => onProviderAuth("facebook")}
              size="large"
              fullWidth
            >
              Register with facebook
            </Button>
            <Button
              onClick={() => onProviderAuth("twitter")}
              size="large"
              fullWidth
            >
              Register with twitter
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withStyles(styles)(Register);
