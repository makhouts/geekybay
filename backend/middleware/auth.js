export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).send({message: "User not authenticated."});
};

export const isNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).send({message: "User already logged in."});
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if(req.user.type ==='admin'){
      return next()
    }
  }
  return res.status(400).send({message: "User is not authenticated."});
};
