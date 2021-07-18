import * as Sentry from "@sentry/react";

function init() {
  Sentry.init({
    dsn:
      "https://5b7214cfc4b84b6b83aa0ad69b43e6ed@o476740.ingest.sentry.io/5516810",
    integrations: [
      new Sentry.Integrations.GlobalHandlers({
        onunhandledrejection: false,
        onerror: false,
      }),
    ],
    tracesSampleRate: 1.0,
    enabled: false,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const methods = {
  init,
  log,
};

export default methods;
