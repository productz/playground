import React from "react";
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
  ListItem
} from "native-base";

const Settings = ({
  user,
  model,
  getModel,
  updateModel,
  deleteModel,
  searchModel,
  location,
  match,
  history,
  classes
}) => {
  let settings = model;
  if (settings && settings.length > 0) {
    let usersView = users.map(user => {
      return (
        <ListItem key={user._id}>
          <ListItemText>
            <p>{user.name}</p>
          </ListItemText>
          <ListItemSecondaryAction>
            <Link to={`${match.url}/${user._id}`}>
              <Button
                onClick={() => {
                  setModelEdit(user, true);
                }}
              >
                <p>Edit</p>
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteModel(user);
              }}
            >
              <p>Delete</p>
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <div className={classes.root}>
        <header>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Input
                  placeholder="Search…"
                  disableUnderline
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </header>
        <Route
          path={`${match.path}/:id`}
          render={({ match }) => {
            return (
              <SettingsEdit
                onCancel={() => setModelEdit(false)}
                onSave={(updatedSettings, values) => {
                  updateModel(updatedSettings, values);
                }}
                user={users.find(({ _id }) => _id === match.params.id)}
                isVisible={isEditing}
              />
            );
          }}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            return (
              <List>
                {usersView}
                <Button
                  onClick={() => {
                    createModel({ name: "Zee" });
                  }}
                >
                  <p>Create Settings</p>
                </Button>
              </List>
            );
          }}
        />
      </div>
    );
  }
  return <CircularProgress />;
};

export default withStyles(styles)(Settings);
