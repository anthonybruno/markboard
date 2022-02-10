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
    <main>
      <div class="primary-wrapper">
        <Nuxt />
      </div>
      <div v-if="!extensionMode" class="tags-wrapper">
        <h1>Tags</h1>

        <m-tagInput
          ref="tagSearch"
          placeholder="Search by tag…"
          :single-value="true"
          @input="updateTagSearch($event)"
        />

        <ul class="tags-list">
          <li v-for="tag in tags" :key="tag.name">
            <NuxtLink :to="{ name: 'tag-slug', params: { slug: tag.name } }">
              {{ tag.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      loaded: false,
      tagFilter: null,
    }
  },
  computed: {
    ...mapGetters({
      tags: 'tags',
      extensionMode: 'extensionMode',
    }),
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
    updateTagSearch(tags) {
      this.tagFilter = tags.query
      if (tags.selectedTags.length === 1) {
        this.$refs.tagSearch.$refs.tagInput.$refs.input.blur()
        // this.$store.commit('updateRefInFocus', 'foo')
        this.$router.push({
          name: 'tag-slug',
          params: { slug: tags.selectedTags[0] },
        })
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

main {
  display: flex;
}

.primary-wrapper {
  flex-grow: 1;
}

.tags-wrapper {
  width: 30%;
  padding-left: 20px;
}

.tags-wrapper ul {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags-wrapper h1 {
  padding-left: 10px;
}

.tags-wrapper .tag-input {
  margin-left: 10px;
}

.tags-list li {
  display: inline-block;
}

.tags-list a {
  color: #00a5e0;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
</style>
