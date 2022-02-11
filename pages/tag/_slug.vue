<template>
  <div>
    <h1>
      {{ slug }}
      <NuxtLink :to="{ name: 'bookmark-add' }">+</NuxtLink>
    </h1>

    <m-bookmark
      v-for="bookmark in bookmarks"
      :id="bookmark.id"
      :key="bookmark.id"
      :url="bookmark.url"
      :title="bookmark.title"
      :created="bookmark.createdAt"
      :tags="bookmark.tags"
    />
  </div>
</template>

<script>
// import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  beforeRouteLeave(to, from, next) {
    this.$store.commit('updateActiveTagFilter', null)
    this.$store.dispatch('bindBookmarks')
    next()
  },
  layout: 'app',
  middleware: 'is-authenticated',
  async asyncData({ params }) {
    const slug = await params.slug
    return { slug }
  },
  computed: {
    ...mapGetters({
      bookmarks: 'bookmarks',
    }),
  },
  created() {
    this.$store.commit('updateActiveTagFilter', this.slug)
    this.$store.dispatch('bindBookmarks')
  },
}
</script>
