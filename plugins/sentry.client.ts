import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
export default defineNuxtPlugin((nuxtApp) => {
    const vueApp = nuxtApp.vueApp
    Sentry.init({
        app: vueApp,
        dsn: "https://a500da3ef9364208950c29c41ed9b619@o954334.ingest.sentry.io/6778723",
        integrations: [
            new BrowserTracing({
              tracingOrigins: ["events254.test", "events254.co.ke", /^\//],
            }),
          ],
          // Set tracesSampleRate to 1.0 to capture 100%
          // of transactions for performance monitoring.
          // We recommend adjusting this value in production
          tracesSampleRate: 1.0,
    })
})
