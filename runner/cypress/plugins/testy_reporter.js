const request = require("sync-request");

const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "https://testy-dev.herokuapp.com/v1/graphql";
const HASURA_ADMIN_SECRET =
  process.env.HASURA_ADMIN_SECRET || "lhjkjahfda3w534kjbtkjfdsg";

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
    // console.log(test);
    report.push({ id: test.title, status: "PASS" });
  });

  runner.on("fail", function (test, err) {
    // console.log(test);
    // console.log(err);
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
    console.log("Variables", variables);
    console.log("Endpoint", GRAPHQL_ENDPOINT);
    console.log("Secret length", HASURA_ADMIN_SECRET.length);

    const res = request("POST", GRAPHQL_ENDPOINT, {
      json: { query, variables },
    });

    console.log(res);

    // const responsePromise = axios({
    //   url: GRAPHQL_ENDPOINT,
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    //   },
    //   data: JSON.stringify({ query, variables }),
    // });
    //
    // try {
    //   console.log("Axios result", deasnycPromise(responsePromise));
    // } catch (e) {
    //   console.error(e);
    // }

    // axios({
    //   url: GRAPHQL_ENDPOINT,
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    //   },
    //   data: JSON.stringify({ query, variables }),
    // })
    //   .then(response => console.log("Axios response", response))
    //   .catch(error => console.log("Axios error", error));
  });
}
