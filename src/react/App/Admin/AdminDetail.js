//this one has the form that edits one resource
const AdminDetail = ({
  model,
  modelName,
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
  let models = model;
  console.log(modelName, models);
  if (models && models.length > 0) {
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
