Playwright Testing Framework.
---


Introduction

This repository contains an end-to-end (E2E) testing framework using Microsoft Playwright. Playwright enables fast and reliable cross-browser testing for modern web applications.

Features

Cross-browser testing (Chromium, Firefox, WebKit)

Headless and headed modes

Mobile emulation

Network interception and request mocking

Auto-wait and retry mechanisms

Parallel test execution

Integration with CI/CD pipelines

Prerequisites

Before using this framework, ensure you have the following installed:

Node.js (>=16.x recommended)

npm or yarn

Installation

Clone this repository and install dependencies:

# Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

Running Tests

Run all tests:

npx playwright test

Run tests in headed mode:

npx playwright test --headed

Run tests on a specific browser:

npx playwright test --browser=chromium

Project Structure

.
├── tests/               # Test cases
│   ├── example.spec.ts  # Example test
├── playwright.config.ts # Playwright configuration
├── package.json        # Project dependencies
├── README.md           # Documentation

Configuration

Playwright can be configured via playwright.config.ts:

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on',
  },
});

Writing Tests

A basic test example:

import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toContain('Playwright');
});

CI/CD Integration

Playwright can be integrated with GitHub Actions, Jenkins, or other CI/CD tools. Example GitHub Actions workflow:

name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run Playwright tests
        run: npx playwright test

Reporting

Generate an HTML report:

npx playwright test --reporter=html

Open the report:

npx playwright show-report

Troubleshooting

Tests failing? Check logs and screenshots in test-results/.

Browser not launching? Ensure dependencies are installed:

npx playwright install

License

This project is licensed under the MIT License - see the LICENSE file for details.