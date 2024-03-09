import { LaunchOptions } from "@playwright/test";

let headless;
if (process.env.PLAYWRIGHT_HEADLESS === "true") {
  headless = true;
} else {
  headless = false;
}
let args: string[];
if (process.env.BROWSER === "webkit") {
  args = [];
} else {
  args = [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    "--disable-web-security",
    "--disable-extensions", 
    "--disable-gpu",
    // "--disable-background-networking"
  ];
}

// Define the browserOptions object with various options for launching a web browser
const browserOptions: LaunchOptions = {
  // Set the slowMo property to 0 (no slowdown)
  slowMo: 0,
  headless: headless,
  // Allows you to test the browser's behavior without having to set up a real camera or microphone.
  args: args,
  // Set the firefoxUserPrefs property to an object with Firefox-specific preferences
  // These preferences might be used to force the browser to use fake media streams and disable permission prompts for them
  firefoxUserPrefs: {
    "media.navigator.streams.fake": true,
    "media.navigator.permission.disabled": true
  }
  // channel: "chrome",
};

// Export the config object, which contains various configuration options for the test suite
export const config = {
  // Set the browser property to the value of the BROWSER environment variable, or "chromium" if not set
  browser: process.env.BROWSER || "chromium",
  browserOptions,
  BASE_URL: process.env.PLAYWRIGHT_TEST_URL || "",
  // Set the IMG_THRESHOLD property to an object with a threshold property set to 0.4 for screenshot comparison
  IMG_THRESHOLD: { threshold: 0.4 }
};
