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
import { Formik } from "formik";
import UserEdit from "./UserEdit";

const User = ({
  model,
  createModel,
  getModel,
  updateModel,
  deleteModel,
  searchModel,
  setModelEdit,
  isEditing,
  editedModel
}) => {
  let users = model;
  if (users) {
    let usersView = users.map(user => {
      return (
        <ListItem>
          <Body>
            <Text>{user.name}</Text>
          </Body>
          <Right>
            <Button
              onPress={() => {
                setModelEdit(user, true);
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
        <UserEdit
          onCancel={() => setModelEdit(false)}
          onSave={(updatedUser, values) => {
            updateModel(updatedUser, values);
          }}
          editedUser={editedModel}
          isVisible={isEditing}
        />
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

export default User;
