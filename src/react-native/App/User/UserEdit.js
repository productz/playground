import React from "react";
import Modal from "react-native-modal";
import { toJS } from "mobx";
import {
  List,
  ListItem,
  Spinner,
  Text,
  Button,
  Container,
  Header,
  Item,
  Input,
  Icon,
  Form,
  Body,
  Right,
  Label
} from "native-base";

import { Formik } from "formik";

export default class UserEdit extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log("here");
    console.log(toJS(nextProps.editedUser));
  }
  render() {
    let { editedUser, onSave, onCancel, isVisible } = this.props;
    let user = editedUser;
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
      <Modal isVisible={isVisible}>
        <Container style={{ flex: 1 }}>
          <Formik
            onSubmit={(values, actions) => {
              onSave(user, values);
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
                          // placeholder={field.value}
                          type={field.type}
                          onChangeText={text => {
                            setFieldValue(field.name, text);
                          }}
                          value={field.value}
                          // onBlur={handleBlur}
                          required={field.required}
                        />
                        {errors[field.name] &&
                          touched[field.name] && (
                            <Text>{errors[field.name]}</Text>
                          )}
                      </Item>
                    );
                  })}
                  <Button
                    onPress={event => {
                      handleSubmit(event);
                    }}
                    // disabled={isSubmitting}
                  >
                    <Text>Save</Text>
                  </Button>
                  <Button
                    onPress={event => {
                      onCancel(event);
                    }}
                    // disabled={isSubmitting}
                  >
                    <Text>Cancel</Text>
                  </Button>
                </Form>
              );
            }}
          />
        </Container>
      </Modal>
    );
  }
}
