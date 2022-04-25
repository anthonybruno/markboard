<template>
  <div v-if="loaded" class="flex flex-col min-h-screen">
    <header
      class="flex md:justify-center flex-col md:flex-row items-center p-2 md:p-3"
    >
      <div v-if="tagFilter" class="pr-3">
        <m-button-link :to="{ name: 'index' }"> {{ tagFilter }} </m-button-link>
      </div>
      <div class="grow w-full md:w-auto order-2 md:order-1">
        <m-tagInput
          ref="tagSearch"
          placeholder="Search by tag"
          :search="true"
          :single-value="true"
          @input="updateTagSearch($event)"
        />
      </div>
      <div class="w-full md:w-auto order-1 md:order-2">
        <ul>
          <li v-if="isSettings === false" class="inline-block md:pl-2">
            <m-button
              v-if="addMode === true"
              label="Cancel"
              @click="cancelAdd()"
            />
            <m-button v-else label="Add" @click="addBookmark()" />
          </li>
          <li v-else class="inline-block pl-1 md:pl-2">
            <NuxtLink :to="{ name: 'index' }">Home</NuxtLink>
          </li>
          <li class="inline-block pl-1 md:pl-2">
            <NuxtLink :to="{ name: 'settings' }">Settings</NuxtLink>
          </li>
          <li class="inline-block pl-1 md:pl-2">
            <a href="#" @click.prevent="signOut()">Sign out</a>
          </li>
        </ul>
      </div>
    </header>
    <main class="flex h-full grow">
      <div class="grow w-full justify-center items-center flex-col">
        <Nuxt />
      </div>
    </main>
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
    }
  },
  computed: {
    ...mapGetters(['tags', 'tagFilter', 'addMode']),
    isSettings() {
      return this.$route.name === 'settings'
    },
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
      if (tags.selectedTags.length === 1) {
        this.$refs.tagSearch.$refs.tagInput.$refs.input.blur()
        this.$router.push({
          name: 'tag-slug',
          params: { slug: tags.selectedTags[0] },
        })
      }
    },
    async addBookmark() {
      await this.$store.commit('updateAddMode', true)
    },
    async cancelAdd() {
      await this.$store.commit('updateAddMode', false)
    },
  },
}
</script>
