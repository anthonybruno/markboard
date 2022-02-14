<template>
  <div>
    <m-input id="email" v-model="email" label="Email" type="email" />
    <m-button label="Reset password" type="submit" @click="formSubmit()" />

    <br />
    <br />
    <NuxtLink :to="{ name: 'signup' }">Create account</NuxtLink>
    <br />
    <NuxtLink :to="{ name: 'signin' }">Sign in</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  layout: 'auth',
  data() {
    return {
      email: null,
    }
  },
  methods: {
    async formSubmit() {
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email)
      } catch (e) {
        this.$logError(e)
      }
    },
  },
}
</script>

<style></style>
