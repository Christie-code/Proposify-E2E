import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import * as messages from "@cucumber/messages";
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from "@playwright/test";

// The parameters passed to the constructor when creating a new ScenarioWorld instance
export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

// An interface that defines the additional properties and methods added to the World class
export interface ScenarioWorld extends World {
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  context2?: BrowserContext;
  page?: Page;

  testName?: string;
  startTime?: Date;

  server?: APIRequestContext;

  playwrightOptions?: PlaywrightTestOptions;
}

export class IScenarioWorld extends World implements ScenarioWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  // A property that indicates whether debugging is enabled - more info here: https://cucumber.io/docs/cucumber/debugging/?lang=javascript
  debug = false;
}
// Set the constructor function for the World class to be the ScenerioWorld class
setWorldConstructor(IScenarioWorld);
