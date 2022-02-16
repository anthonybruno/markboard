<template>
  <div>
    <h1>Sign up</h1>

    <form @submit="formSubmit()">
      <m-input id="email" v-model="email" label="Email" type="email" />
      <m-input
        id="password"
        v-model="password"
        label="Password"
        type="password"
      />
      <m-button label="Create account" type="submit" @click="formSubmit()" />

      <p v-if="displayError" class="error">
        {{ displayError }}
      </p>

      <br /><br />
      <NuxtLink :to="{ name: 'signin' }">Sign in</NuxtLink>
      <br />
      <NuxtLink :to="{ name: 'forgot-password' }">Forgot password?</NuxtLink>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  layout: 'auth',
  data() {
    return {
      email: null,
      password: null,
      displayError: null,
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
  },
  methods: {
    async formSubmit() {
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
  },
}
</script>

<style scoped>
form {
  max-width: 230px;
}
</style>
