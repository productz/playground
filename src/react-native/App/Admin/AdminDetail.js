import React from "react";
import { Crud } from "../../../react+react-native/index";
import { toJS } from "mobx";
import {
  Container,
  Drawer,
  Content,
  H1,
  H2,
  H3,
  Text,
  Header,
  List,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";

const AdminDetail = ({
  schema,
  location,
  match,
  history,
  classes,
  detail
}) => {
  if (false) {
    return models.map(model => {
      return (
        <ListItem key={model._id}>
          <ListItemText>
            <p>{model.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Link to={`${match.url}/${model._id}`}>
              <Button
                onClick={() => {
                  setModelEdit(model, true);
                }}
              >
                <p>Edit</p>
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteModel(model);
              }}
            >
              <p>Delete</p>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  }
  return <CircularProgress />;
};

export default AdminDetail;
