<template>
  <div>
    <m-input id="email" v-model="email" label="Email" type="email" />
    <m-input
      id="password"
      v-model="password"
      label="Password"
      type="password"
    />
    <m-button label="Sign in" type="submit" @click="formSubmit()" />

    <br />
    <br />
    <NuxtLink :to="{ name: 'signup' }">Create account</NuxtLink>
    <br />
    <NuxtLink :to="{ name: 'forgot-password' }">Forgot password?</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  layout: 'auth',
  data() {
    return {
      email: 'hey@coolstud.io',
      password: 'password',
    }
  },
  methods: {
    async formSubmit() {
      await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )
    },
    async forgotPassword() {
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email)
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
    },
  },
}
</script>

<style></style>
