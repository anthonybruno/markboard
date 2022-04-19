<template>
  <div
    v-if="loaded"
    class="flex flex-col min-h-screen justify-center items-center mx-auto max-w-5xl"
  >
    <div class="grow w-full">
      <header class="flex items-center py-10">
        <div class="logo grow">
          <m-logo />
        </div>
        <ul>
          <li class="inline-block pl-2">
            <NuxtLink :to="{ name: 'settings' }">Settings</NuxtLink>
          </li>
          <li class="inline-block pl-2">
            <a href="#" @click.prevent="signOut()">Sign out</a>
          </li>
        </ul>
      </header>
      <main class="flex">
        <div class="grow w-full justify-center items-center flex-col">
          <Nuxt />
        </div>
        <div v-if="!extensionMode" class="tags-wrapper w-1/3 pl-10">
          <h1 class="pb-5">Tags</h1>

          <m-tagInput
            ref="tagSearch"
            placeholder="Search by tag…"
            :single-value="true"
            @input="updateTagSearch($event)"
          />

          <ul class="block">
            <li v-for="tag in tags" :key="tag.name" class="inline-block">
              <NuxtLink
                class="inline-block p-3"
                :to="{ name: 'tag-slug', params: { slug: tag.name } }"
              >
                {{ tag.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <m-footer />
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
    ...mapGetters(['tags', 'extensionMode']),
  },
  async created() {
    await this.$store.dispatch('bindBookmarks')
    await this.$store.dispatch('bindTags')
    this.loaded = true
  },
  methods: {
    async signOut() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        this.$logError(e)
      }
    },
    updateTagSearch(tags) {
      this.tagFilter = tags.query
      if (tags.selectedTags.length === 1) {
        this.$refs.tagSearch.$refs.tagInput.$refs.input.blur()
        this.$router.push({
          name: 'tag-slug',
          params: { slug: tags.selectedTags[0] },
        })
      }
    },
  },
}
</script>
