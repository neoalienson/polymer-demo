# Intern tutorial

In this tutorial, we will walk through how to set up, write tests, and run tests using Intern. This repository contains a very basic Hello World demo “application” that we’ll be using as an example to build on. In order to complete this tutorial, you will need the following:

* A Bourne-compatible shell, like bash or zsh (or knowledge to execute equivalent commands in your environment)
* [Git](http://gitscm.com/)
* [Node 0.8+](http://nodejs.org/)
* A [free Sauce Labs account](https://saucelabs.com/signup/plan/free)

Once you have all the necessary prerequisites, download the demo application by cloning this repository:

```bash
git clone https://github.com/theintern/intern-tutorial.git
```

The application itself consists of a basic HTML page and a single “app” package.

## What can Intern test?

Intern supports two types of tests: unit tests and functional tests. **Unit tests** work by executing code directly and inspecting the result, such as calling a function and then checking that it returns an expected value. **Functional tests** mimic user interaction and work by issuing commands to browsers via a WebDriver browser extension. As such, they require an external server that sends these commands to the browser and processes the result. This is a powerful notion: Intern allows us to test *code* with regular unit tests, but also allows us to test *functionality* by mimicking user interaction within real browsers.

## Step 1: Download Intern

Intern is distributed as an [npm package](https://npmjs.org/package/intern) so it can be easily added as a dependency to any project. We’ve created a basic [package.json](https://npmjs.org/doc/json.html) already for our demo application and will install Intern using the `--save-dev` flag so that npm adds it automatically as a development dependency:

```bash
cd intern-tutorial
npm install intern --save-dev
```

