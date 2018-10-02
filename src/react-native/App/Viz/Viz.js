import React from "react";
import { toJS } from "mobx";


const Viz = ({
  model,
  createModel,
  getModel,
  updateModel,
  deleteModel,
  searchModel,
  setModelEdit,
  isEditing,
  editedModel,
  location,
  match,
  history,
  classes
}) => {
  let users = model;
  if (users && users.length > 0) {
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
              <UserEdit
                onCancel={() => setModelEdit(false)}
                onSave={(updatedUser, values) => {
                  updateModel(updatedUser, values);
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
                  <p>Create User</p>
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

export default User;
