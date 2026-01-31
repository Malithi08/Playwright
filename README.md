# SwiftTranslator Playwright Automation

This repository contains automated Playwright tests for the [SwiftTranslator](https://www.swifttranslator.com/) website, focusing on Sinhala transliteration.  
It includes Positive Tests (valid input/output), Negative Tests (invalid input/output) and UI Test (valid input) to ensure the site works as expected.

## Install dependencies 
npm init playwright@latest 

## Run all tests 
npx playwright test 

## Run a single test file
npx playwright test tests/positive.spec.js 
npx playwright test tests/negative.spec.js 
npx playwright test ui.spec.js --headed 

## View report 
npx playwright show-report

