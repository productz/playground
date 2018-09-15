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
import { Formik, Field, Form } from "formik";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

let fields = [
  {
    type: "email",
    name: "email",
    placeholder: "please enter your email"
  },
  {
    type: "password",
    name: "password",
    placeholder: "please enter your password"
  }
];

export const Login = ({
  onChange,
  onSubmit,
  onProviderAuth,
  onRegister,
  classes
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Login" />
      <CardContent>
        <Formik
          initialValues={user /** { email, social } */}
          onSubmit={(values, actions) => {
            console.log(values,actions);
            // CallMyApi(user.id, values).then(
            //   updatedUser => {
            //     actions.setSubmitting(false);
            //     updateUser(updatedUser), onClose();
            //   },
            //   error => {
            //     actions.setSubmitting(false);
            //     actions.setErrors(transformMyAPIErrorToAnObject(error));
            //   }
            // );
          }}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              {fields.map(field => {
                <TextField
                  id={field.name}
                  label={field.placeholder}
                  type={field.type}
                  onChange={event => handleChange()}
                  margin="normal"
                  onKeyPress={event => (event.key === 13 ? onSubmit() : "")}
                />;
                {
                  errors[field.name] &&
                    touched[field.name] && <div>{errors[field.name]}</div>;
                }
              })}

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        />
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onSubmit} type="submit">
          Login
        </Button>
        <Button size="small" color="secondary" onClick={onRegister}>
          Register
        </Button>
      </CardActions>
      <div>
        <Button onClick={() => onProviderAuth("google")} size="large" fullWidth>
          Login with Google
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
