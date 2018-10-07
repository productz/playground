import React from "react";
import { toJS } from "mobx";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormFields, validate } from "../Forms/Forms";

export default class UserEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  render() {
    console.log("rerender user edit");
    let { user, onSave, onCancel, form } = this.props;

    return (
      <div style={{ flex: 1 }}>
        <Formik
          onSubmit={(values, actions) => {
            onSave(user, values);
          }}
          initialValues={toJS(user)}
          validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}
          validate={(values, props) => {
            let errors = validate(values, form);
            return errors;
          }}
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
                <FormFields
                  form={form}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  values={values}
                  touched={touched}
                />
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
