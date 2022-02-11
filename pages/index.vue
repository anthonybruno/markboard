<template>
  <div>
    <template v-if="!hasBookmarks">
      <h1>Looks like you don't have any bookmarks yet ya doofus!</h1>
      <NuxtLink :to="{ name: 'bookmark-add' }">Add a bookmark</NuxtLink>
    </template>

    <template v-else>
      <h1>
        Bookmarks
        <NuxtLink :to="{ name: 'bookmark-add' }">+</NuxtLink>
      </h1>
      <m-bookmark
        v-for="bookmark in bookmarks"
        :id="bookmark.id"
        :key="bookmark.id"
        :title="bookmark.title"
        :url="bookmark.url"
        :created="bookmark.createdAt"
        :tags="bookmark.tags"
      />
    </template>
  </div>
</template>

<script>
// import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'app',
  middleware: 'is-authenticated',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      bookmarks: 'bookmarks',
    }),
    hasBookmarks() {
      return this.bookmarks && this.bookmarks.length > 0
    },
  },
  methods: {},
}
</script>

<style scoped>
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
