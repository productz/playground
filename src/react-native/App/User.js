import React from "react";
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
import Modal from "react-native-modal";
import { Formik } from "formik";

const User = ({
  model,
  createModel,
  getModel,
  updateModel,
  deleteModel,
  searchModel,
  setModelEdit,
  isEditing
}) => {
  let users = model;
  if (users) {
    let usersView = users.map(user => {
      return (
        <ListItem>
          <Body>
            <Text>{user.name}</Text>
            <UserEdit
              onCancel={() => setModelEdit(false)}
              onSave={(updatedUser, values) => {
                updateModel(updatedUser, values);
              }}
              user={user}
              isVisible={isEditing}
            />
          </Body>
          <Right>
            <Button
              onPress={() => {
                setModelEdit(true);
              }}
            >
              <Text>Edit</Text>
            </Button>
            <Button
              onPress={() => {
                deleteModel(user);
              }}
            >
              <Text>Delete</Text>
            </Button>
          </Right>
        </ListItem>
      );
    });
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <List>
          {usersView}
          <Button
            onPress={() => {
              createModel({ name: "Zee" });
            }}
          >
            <Text>Create User</Text>
          </Button>
        </List>
      </Container>
    );
  }
  return <Spinner />;
};

const UserEdit = ({ user, onSave, onCancel, isVisible }) => {
  let fields = [];
  if (user) {
    fields = Object.keys(user).map(key => {
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
};

export default User;
