import React from "react";
//this will take Admin from "admin-service"
//and pass in the MODALS that will be used to edit the resource
//MODALS then will just be wrapped in a crud component that will pass it the (getModel,createModel,updateModel...etc)
const AdminPage = ({}) => {
  return (
    <Admin>
      Admin Page This will go to /schemas, grab the resources there and enable
      you to edit any Model
      <AdminModal />
    </Admin>
  );
};

const AdminModal = ({
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
  //try and do everything here
};

export default Admin;
