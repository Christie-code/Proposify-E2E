# Proposify Test Suite Documentation
This document outlines the test suites created for the Proposify web application, detailing their structure and the testing scenarios they cover. The test suite is written using the Playwright testing framework with JavaScript/TypeScript.

## Overview
Three scenarios have been scripted for automated testing:

1. Upload Images to Document Library: Tests the ability to upload multiple images into a document's library.
2. Add a Signature Block to a New Document: Verifies the functionality of adding a signature block to the document's edge.
3. Verify Documents Draft Filter and Trash: Assesses the filter feature for drafts and the functionality of the trash.

## Prerequisites
Before running the tests, ensure you have the following setup on your machine:

- Node.js installed (v18 or newer).
- Playwright Test Runner installed globally or in your project.
- Access to the application under test.

## Installation
To install the necessary dependencies, run:

```
git clone https://github.com/Christie-code/Proposify-E2E.git
cd Proposify-E2E
npm install
```

## Running the Tests
Execute the following command to run the automated tests:

```
npx playwright test
```

Execute the following command to run the automated tests with UI:

```
npx playwright test --ui
```

To run a specific test suite, append the suite name:

```
npx playwright test --grep "<suite-name>"
```


Execute the following command to see the report:

```
npx playwright show-report
```

## Test Files Structure
The tests are organized in the following structure:

- `tests/`
    - `document.spec.ts`: Contains tests for the Document feature and for handing document management feature.

Each test file imports page object models from the xpath_selectors directory and utility functions from commons.js.

## Common Utilities
- `commons.ts`: Contains utility functions, including a function to log in to the application.
- `xpath_selectors.js`: Contains XPath selectors for different elements on the pages.

## Reporting
After running the tests, a report will be generated in the `playwright-report` directory. Open the `index.html` file in a browser to view it.