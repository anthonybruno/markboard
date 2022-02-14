// General error logging wrapper for Sentry
export default function ({ app }, inject) {
  inject('logError', (msg) => console.error(msg))
}

// export default function ({ $sentry }, inject) {
//   inject('logError', (msg) => $sentry.captureException(new Error(msg)))
// }
