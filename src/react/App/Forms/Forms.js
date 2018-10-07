import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { Forms } from "../react+react-native";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 750,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  textField: {
    margin: "1em 0"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const Fields = ({ form, setFieldValue, errors, touched, values }) => {
  if (form) {
    let fieldsView = form.fields.map(field => {
      return (
        <CardContent style={{ margin: "3em" }}>
          {field.type === "text" && (
            <TextField
              id={field.name}
              label={field.name}
              type={field.type}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              fullWidth={true}
              // onBlur={handleBlur}
              value={values[field.name]}
              required={field.required || false}
            />
          )}
          {field.type === "email" && (
            <TextField
              id={field.name}
              label={field.name}
              type={field.type}
              fullWidth={true}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              // onBlur={handleBlur}
              value={values[field.name]}
              required={field.required || false}
            />
          )}
          {field.type === "password" && (
            <TextField
              id={field.name}
              label={field.name}
              type={field.type}
              fullWidth={true}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              // onBlur={handleBlur}
              value={values[field.name]}
              required={field.required || false}
            />
          )}
          {field.type === "select" && (
            <TextField
              id={field.name}
              label={field.name}
              type={field.type}
              fullWidth={true}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              // onBlur={handleBlur}
              value={values[field.name]}
              required={field.required || false}
            />
          )}
          {field.type === "image" && (
            <TextField
              id={field.name}
              label={field.name}
              type={field.type}
              onChange={event => {
                setFieldValue(field.name, event.target.value);
              }}
              // onBlur={handleBlur}
              value={values[field.name]}
              required={field.required || false}
            />
          )}
          {errors[field.name] &&
            touched[field.name] && <p>{errors[field.name]}</p>}
        </CardContent>
      );
    });
    return <Card>{fieldsView}</Card>;
  }
  return <CircularProgress />;
};

const FormContainer = ({
  form,
  formsDomainStore,
  setFieldValue,
  errors,
  values,
  touched
}) => {
  return (
    <Fields
      errors={errors}
      setFieldValue={setFieldValue}
      values={values}
      touched={touched}
      form={form}
    />
  );
};

export const validate = (values, form) => {
  let errors = {};
  form.fields.map(field => {
    if (field.required && !values[field.name]) {
      errors[field.name] = "Required";
    } else if (field.type === "email") {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors[field.name] = "Invalid Email";
      }
    }
  });
  return errors;
};
 
export const FormFields = withStyles(styles)(FormContainer);
