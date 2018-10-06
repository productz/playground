export const registerAction = ({ key, domainLogic, userModel }) => {
  //update permissions object for all users if it doesn't exist
  Object.keys(domainLogic).map(actionKey => {
    //look for all user permissions
    userModel.find({}).exec((err, users) => {
      users.map(user => {
        let permissions = user.permissions;
        if (!permissions[key]) {
          user.permissions[`${key}.${actionKey}`] = false;
          userModel.findOneAndUpdate(
            { _id: user._id },
            user,
            {
              upsert: false
            },
            function(err, doc) {
              if (err) {
                return console.error(err);
              }
              return doc;
            }
          );
        }
      });
    });
  });
};

export const isPermitted = ({ key, user }) => {
  return user.permissions[key];
};
