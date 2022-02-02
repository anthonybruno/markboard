<template>
  <div>
    <form @submit="formSubmit()">
      <m-input id="email" v-model="email" label="Email" type="email" />
      <m-input
        id="password"
        v-model="password"
        label="Password"
        type="password"
      />
      <m-button label="Create account" type="submit" @click="formSubmit()" />
      <br /><br />
      <NuxtLink :to="{ name: 'signin' }">Sign in</NuxtLink>
      <br />
      <NuxtLink :to="{ name: 'forgot-password' }">Forgot password?</NuxtLink>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Signup',
  layout: 'auth',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId',
    }),
  },
  methods: {
    async formSubmit() {
      await this.$fire.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      )
      this.createDefaultCollection()
    },
    async createDefaultCollection() {
      await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      )
      await this.$fire.firestore.collection('users').doc(this.userId).set({
        name: null,
      })
    },
  },
}
</script>

<style></style>
