<template>
  <div>
    <h1>{{ signupOrLogin }}</h1>

    <m-button
      label="Continue with Google"
      type="button"
      variant="google"
      @click="authWithGoogle()"
    />

    <br /><br />

    <m-button
      label="Continue with Github"
      type="button"
      variant="github"
      @click="authWithGithub()"
    />

    <br /><br />
    <hr />

    <h3>{{ signupOrLogin }} with email</h3>

    <form @submit.prevent="formSubmit()">
      <m-input id="email" v-model="email" label="Email" type="email" />
      <m-input
        id="password"
        v-model="password"
        label="Password"
        type="password"
      />
      <m-button :label="signupOrLogin" type="submit" @click="formSubmit()" />
    </form>

    <br />
    <br />
    <NuxtLink :to="{ name: 'forgot-password' }">Forgot password?</NuxtLink>
    <br />
    <NuxtLink v-if="isSignup" :to="{ name: 'login' }">Login</NuxtLink>
    <NuxtLink v-else :to="{ name: 'signup' }">Signup</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  layout: 'auth',
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null,
    }
  },
  computed: {
    isSignup() {
      return this.$route.name === 'signup'
    },
    signupOrLogin() {
      if (this.isSignup) return 'Signup'
      return 'Login'
    },
  },
  methods: {
    formSubmit() {
      if (this.isSignup) {
        this.signUp()
      } else {
        this.signIn()
      }
    },
    async signIn() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (e) {
        this.$logError(e)
      }
    },
    async signUp() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        this.createDefaultCollection()
      } catch (e) {
        console.log(e.code)
        this.displayError = e

        if (e.code === 'auth/email-already-in-use')
          this.displayError =
            'Email already in use by another account. Try logging in with Google or Github.'

        this.$logError(e)
      }
    },
    async createDefaultCollection() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        await this.$fire.firestore.collection('users').doc(this.userId).set({
          name: null,
        })
      } catch (e) {
        this.$logError(e)
      }
    },
    authWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()

      this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    authWithGithub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider()

      this.$fire.auth.signInWithPopup(provider).then((result) => {
        console.log(result)
      })
    },
    async forgotPassword() {
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email)
      } catch (e) {
        this.$logError(e)
      }
    },
  },
}
</script>
