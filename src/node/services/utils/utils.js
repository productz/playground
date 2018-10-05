export const executeDomain = (req, res, domainFn) => {
  //returns criteria
  let user = req.decoded && req.decoded._id;
  return domainFn(user, req, res);
};
