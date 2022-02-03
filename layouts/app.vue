<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <m-logo />
      </div>
      <ul>
        <li>
          <NuxtLink :to="{ name: 'settings' }">Settings</NuxtLink>
        </li>
        <li>
          <a href="#" @click.prevent="signOut()">Sign out</a>
        </li>
      </ul>
    </header>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'App',
  async mounted() {
    try {
      await this.$store.dispatch('bindBookmarks')
      await this.$store.dispatch('bindTags')
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async signOut() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        console.error(e) // eslint-disable-line
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  max-width: 1000px;
  margin: 30px auto;
}
header {
  overflow: hidden;
}
.logo {
  float: left;
}
ul {
  list-style: none;
  padding: 0;
  height: 100%;
  float: right;
}
li {
  display: inline-block;
}
</style>
