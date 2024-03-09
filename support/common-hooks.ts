import { ScenarioWorld } from "./scenario-world";
import { config } from "./config";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request
} from "@playwright/test";
import { ITestCaseHookParameter } from "@cucumber/cucumber/lib/support_code_library_builder/types";
import { ensureDir } from "fs-extra";
import * as fs from "fs";
// Auth files for project
import { authFile, noAuthFile } from "../util/commons";

let sessionFilePath = authFile;

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = "traces";

// This declares a global browser variable that can be used across all test scenarios.
declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

// Sets the default timeout for the steps in the test scenarios.
setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

// BeforeAll hook to launch the browser and ensure the traces directory exists.
BeforeAll(async function () {
  switch (config.browser) {
    case "firefox":
      browser = await firefox.launch(config.browserOptions);
      break;
    case "webkit":
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  // Ensure the directory for the trace files exists.
  await ensureDir(tracesDir);
});

// Before hook to skip scenarios tagged with '@ignore'.
Before({ tags: "@ignore" }, async function () {
  return "skipped" as any;
});

// Before hook to enable debugging for scenarios tagged with '@debug'.
Before({ tags: "@debug" }, async function (this: ScenarioWorld) {
  this.debug = true;
});

// Before hook to enable debugging for scenarios tagged with '@noauth'.
Before({ tags: "@noauth" }, async function (this: ScenarioWorld) {
  sessionFilePath = noAuthFile;
});

// Before hook to set up the browser context and server for each scenario.
Before(async function (this: ScenarioWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, "-");
  // Create a new browser context with specified options.
  this.context = await browser.newContext({
    storageState: sessionFilePath,
    acceptDownloads: true,
    recordVideo: { dir: "./recordings" },
    viewport: { width: 1200, height: 800 }
  });

  // Start tracing for the current browser context.
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  // Create a new browser page.
  this.page = await this.context.newPage();
  
  // Maximize the window
  await this.page.setViewportSize({ width: 1450, height: 1080 }); // You can adjust the size to your screen resolution

  // Assign the current feature to the world.
  this.feature = pickle;

});

// After hook to attach the test results, screenshots, and trace files to the report.
After(async function (this: ScenarioWorld, { result }: ITestCaseHookParameter) {
  // Close the browser page and context after each scenario.
  await this.page?.close();
  await this.context?.close();

  if (result) {
    const endTime = new Date();
    const elapsedMilliseconds =
      endTime.getTime() - (this.startTime?.getTime() ?? endTime.getTime());
    const elapsedSeconds = Math.round(elapsedMilliseconds / 1000);
    await this.attach(`Status: ${result?.status}. Duration:${elapsedSeconds}s`);
    const videoPath = await this.page?.video()?.path();
    if (videoPath != null) {
      const videoBuffer = fs.readFileSync(videoPath);
      this.attach(videoBuffer, "video/webm");
    }

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, "image/png"));
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${
          this.startTime?.toISOString().split(".")[0]
        }trace.zip`
      });
    }
  }
});

// AfterAll hook to close the browser after all scenarios are executed.
AfterAll(async function () {
  await browser.close();
});
