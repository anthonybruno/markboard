const defaultError = {
  code: 'default',
  response: 'Something went wrong. Please refresh the page and try again.',
}

// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup
const authMap = [
  {
    code: 'auth/user-not-found',
    response: 'No account associated with this email. Want to sign up instead?',
  },
  {
    code: 'auth/email-already-in-use',
    response:
      'Looks like this email is already in use with another account. Try logging in with other providers?',
  },
  {
    code: 'auth/cancelled-popup-request',
    response:
      'Looks like you have too many pop-up windows open. Close them and try again.',
  },
  {
    code: 'auth/popup-blocked',
    response:
      'We tried to open a popup for login but your computer blocked it. Oh boy.',
  },
  {
    code: 'auth/wrong-password',
    response: 'Invalid password. Please try again.',
  },
]
// General error logging wrapper for Sentry
export default ({ app }, inject) => {
  inject('logError', (msg) => console.error(msg))

  inject('handleAuthResponse', (providedCode) => {
    return (
      authMap.find((errMap) => errMap.code === providedCode) || defaultError
    )
  })
}

// export default function ({ $sentry }, inject) {
//   inject('logError', (msg) => $sentry.captureException(new Error(msg)))
// }
