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

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const Fields = ({ model, setFieldValue, errors, touched, values }) => {
  let form = model;
  return (
    <div>
      {form.fields.map(field => {
        {
          field.type === "text" ||
            field.type === "email" ||
            (field.type === "password" && (
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
            ));
        }
        {
          field.type === "select" && (
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
          );
        }
        {
          field.type === "image" && (
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
          );
        }
        {
          errors[field.name] &&
            touched[field.name] && <p>{errors[field.name]}</p>;
        }
      })}
    </div>
  );
};

const FormFields = ({
  modelName,
  formsDomainStore,
  setFieldValue,
  errors,
  values,
  touched
}) => {
  return (
    <Forms modelName={modelName} formsDomainStore={formsDomainStore}>
      <Fields
        errors={errors}
        setFieldValue={setFieldValue}
        values={values}
        touched={touched}
      />
    </Forms>
  );
};

export default withStyles(styles)(FormFields);
