#!/bin/bash

export PLAYWRIGHT_TEST_URL=https://gmail-270222.proposify.com
export BROWSER=chromium
export PLAYWRIGHT_HEADLESS="false"
export RETRY_COUNT=1
export PLAYWRIGHT_PARALLEL_THREADS=1

# Run a specific test example
# npm run test:feature features/login.feature
# npm run test:feature features/document_creation.feature
# npm run test:feature features/document_management.feature

#Run Sanity
# npm run test:sanity

# Run All Test
npm run test:e2e-all

# Generate Allure Report
npm run allure-clean

#Serve Allure Report
# npm run allure