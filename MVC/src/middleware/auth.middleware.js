const middleware = (req, res, next) => {
  if (req.headers.token) {
    return res.send("Invalid");
  }
  return next();
};
module.exports = middleware;
