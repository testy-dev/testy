const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  outputDir: "src/graphql",
  headers: {
    authorization: process.env.GRAPHQL_AUTHORIZATION,
  },
};
