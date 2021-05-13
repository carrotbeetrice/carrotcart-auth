const createRoute = (root, path) => {
  const endpoint = `${root}${path}`;
  return endpoint;
};

module.exports = (app, root) => {
  // Root access
  app.use(root, require("./rootController"));

  // Authentication endpoints
  app.use(createRoute(root, "/auth"), require("./authController"));
};
