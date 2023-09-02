let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:3200",
    basePath: "/v1",
    produces: ["application/json", "application/xml"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["../routes/**/*.js", "../controllers/**/*.js"], //Path to the API handle folder
};

module.exports = options