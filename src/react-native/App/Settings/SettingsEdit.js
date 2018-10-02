import React from "react";
import { toJS } from "mobx";
import { Formik } from "formik";
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

export default class SettingsEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  render() {
    console.log("rerender settings edit");
    let { settings, onSave, onCancel } = this.props;
    let fields = [];
    let editablePropeerties = ["name"];
    if (settings) {
      fields = Object.keys(settings)
        .filter(key => editablePropeerties.indexOf(key) !== -1)
        .map(key => {
          return {
            type: "text",
            name: key,
            placeholder: key,
            value: settings[key]
          };
        });
    }
    return (
      <div style={{ flex: 1 }}>
        <Formik
          onSubmit={(values, actions) => {
            onSave(settings, values);
          }}
          initialValues={toJS(settings)}
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
