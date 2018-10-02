import React from "react";
import { toJS } from "mobx";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class HouseEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  render() {
    console.log("rerender user edit");
    let { user, onSave, onCancel } = this.props;
    let fields = [];
    let editablePropeerties = ["name"];
    if (user) {
      fields = Object.keys(user)
        .filter(key => editablePropeerties.indexOf(key) !== -1)
        .map(key => {
          return {
            type: "text",
            name: key,
            placeholder: key,
            value: user[key]
          };
        });
    }
    return (
      <div style={{ flex: 1 }}>
        <Formik
          onSubmit={(values, actions) => {
            onSave(user, values);
          }}
          initialValues={toJS(user)}
          enableReinitialize={true}
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
              <form>
                {fields.map((field, index) => {
                  let hasError =
                    errors[field.name] && errors[field.name].length > 0;
                  return (
                    <div key={field.name}>
                      <TextField
                        id={field.name}
                        label={field.name}
                        type={field.type}
                        onChange={event => {
                          setFieldValue(field.name, event.target.value);
                        }}
                        // onBlur={handleBlur}
                        value={values[field.name]}
                        required={field.required}
                      />
                      {errors[field.name] &&
                        touched[field.name] && <p>{errors[field.name]}</p>}
                    </div>
                  );
                })}
                <Button
                  onClick={event => {
                    handleSubmit(event);
                  }}
                  // disabled={isSubmitting}
                >
                  <p>Save</p>
                </Button>
                <Button
                  onClick={event => {
                    onCancel(event);
                  }}
                  // disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
