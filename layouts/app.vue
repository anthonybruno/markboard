<template>
  <div v-if="loaded" class="wrapper">
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
  data() {
    return {
      loaded: false,
    }
  },
  async created() {
    try {
      await this.$store.dispatch('bindBookmarks')
      await this.$store.dispatch('bindTags')
      this.loaded = true
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

<style>
.wrapper {
  max-width: 1000px;
  margin: 30px auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
header {
  overflow: hidden;
}
.logo {
  float: left;
}
header ul {
  list-style: none;
  padding: 0;
  height: 100%;
  float: right;
}
header li {
  display: inline-block;
  font-weight: bold;
}

a {
  color: #e07a5f;
}
a:hover {
  text-decoration: none;
}
</style>
