<template>
  <div>
    <header>
      <ul>
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <!-- <li>
          <NuxtLink :to="{ name: 'bookmarks' }">Your bookmarks</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'bookmarks-add' }">Add bookmark</NuxtLink>
        </li> -->
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

<style></style>
