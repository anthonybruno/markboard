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

      <p v-if="isSignup" class="terms">
        By continuing signup via email or through our auth providers, you agree
        to our

        <NuxtLink :to="{ name: 'terms' }">Terms of Service</NuxtLink>,
        <NuxtLink :to="{ name: 'privacy-policy' }">Privacy Policy</NuxtLink>.
      </p>

      <m-button :label="signupOrLogin" type="submit" @click="formSubmit()" />
    </form>

    <div v-if="displayError" class="errors">
      <p>{{ displayError.response }}</p>
    </div>

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
      displayError: null,
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
        this.displayError = this.$handleAuthResponse(e.code)
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
      this.$fire.auth.signInWithPopup(provider)
    },
    authWithGithub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider()
      this.$fire.auth.signInWithPopup(provider)
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

<style scoped>
.errors,
.terms {
  width: 240px;
}
</style>
