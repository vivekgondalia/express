function authenticator(req, res, next) {
  console.log("Authentication...");
  next();
}

module.exports = authenticator;
