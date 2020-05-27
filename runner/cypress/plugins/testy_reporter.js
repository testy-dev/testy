const fetch = require("node-fetch");
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "";
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET || "";

exports = module.exports = Base;

function Base(runner) {
  if (!runner) {
    throw new TypeError("Missing runner argument");
  }
  const report = [];
  let suiteId = "";

  runner.on("suite", function (suite) {
    suiteId = suite.title;
  });

  runner.on("pass", function (test) {
    console.log(test);
    report.push({ id: test.title, status: "PASS" });
  });

  runner.on("fail", function (test, err) {
    console.log(test);
    console.log(err);
    report.push({ id: test.title, status: "FAIL", msg: err.message });
  });

  runner.on("end", function () {
    const query = `
        mutation($edges: jsonb, $id: bigint) {
          update_run_path(where: {id: {_eq: $id}}, _set: {edges: $edges}) {
            returning {
              id
            }
          }
        }
      `;
    const variables = { id: suiteId, edges: JSON.stringify(report) };
    console.log(variables);

    fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({ query, variables }),
      mode: "cors",
    })
      .then(console.warn)
      .catch(console.error);
  });
}
