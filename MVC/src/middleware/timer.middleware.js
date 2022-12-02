const timemiddleware = (config) => {
  return (req, res, next) => {
    console.log(config);
    next();
  };
};

module.exports = timemiddleware;
