export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("error");
};

export const isNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send("error");
  }
    next();
};
