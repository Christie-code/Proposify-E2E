import process from "process";

// A function to get parameters for the test world.
const getWorldParams = () => {
  // Define any parameters you want to pass to the test world here.
  // The world is an object that serves as a shared context for step definitions within a scenario.
  // These parameters can be used to provide shared configurations, data, or utility functions.
  const params = {
    sanity: "sanity",
    noauth: "noauth"
  };

  // Return the parameters.
  return params;
};

const config = {
  requireModule: ["ts-node/register"],
  // This property tell cucmber where to find the feature files.
  // NOTE: Uncommenting this causes a bug where all the test are always run.
  // paths: ["features/**/*.feature"],
  // This property tells Cucumber where to find the step definition files and support files.
  require: ["steps/**/*.ts", "support/**/*.ts"],

  // Uncomment the following lines to run tests in parallel or stop the execution on the first failed scenario.
  parallel: Number(process.env.PLAYWRIGHT_PARALLEL_THREADS),
  // failFast: true,
  retry: Number(process.env.RETRY_COUNT),

  // This property specifies the formats for the output reports.
  format: [
    // Uncomment the following line to output the report in ndjson format.
    // 'message:e2e-tests/reports/cucumber-report.ndjson',
    // JSON report format.
    "json:reports/cucumber-report.json",
    // HTML report format.
    "html:reports/report.html",
    // Summary report format.
    "summary",
    // Progress bar report format.
    "progress-bar"
  ],

  // This property specifies options for the report format, like the snippet interface.
  formatOptions: { snippetInterface: "async-await" },

  // This property specifies the world parameters, which are passed to the test world.
  // The world serves as a shared context for step definitions within a scenario.
  // The world parameters can provide shared configurations, data, or utility functions.
  worldParameters: getWorldParams()
};

// Add the `@cucumber/pretty-formatter` to the report format list.
config.format.push("@cucumber/pretty-formatter");
// Add the `allure-reporter` to the report format list, with a dummy output file. This allows the use of both pretty-formatter and allure report.
config.format.push("./support/reporters/allure-reporter.ts:./dummy.txt");
// Export the config object as the default export.
export default config;
