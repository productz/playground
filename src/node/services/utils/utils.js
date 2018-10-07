export const executeDomain = (req, res, domainFn) => {
  //returns criteria
  let user = req.decoded;
  return domainFn(user, req, res);
};

export const parseNumberQuery = obj => {
  Object.keys(obj).map(key => {
    if (parseInt(obj[key])) {
      obj[key] = parseInt(obj[key]);
    }
  });
  return obj;
};
