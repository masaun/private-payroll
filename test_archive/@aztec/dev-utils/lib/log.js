"use strict";

function errorLog() {
  if (process.env.NODE_ENV !== 'production') {
    var _console;

    (_console = console).error.apply(_console, arguments); // eslint-disable-line no-console

  }
}

function log() {
  if (process.env.NODE_ENV !== 'production') {
    var _console2;

    (_console2 = console).log.apply(_console2, arguments); // eslint-disable-line no-console

  }
}

function warnLog() {
  if (process.env.NODE_ENV !== 'production') {
    var _console3;

    (_console3 = console).warn.apply(_console3, arguments); // eslint-disable-line no-console

  }
}

module.exports = {
  errorLog: errorLog,
  log: log,
  warnLog: warnLog
};