<template>
  <div>
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
export default {
  name: 'SlugPage',
  beforeRouteLeave(to, from, next) {
    this.$store.commit('updateActiveTagFilter', null)
    this.$store.dispatch('bindBookmarks').then(() => {
      next()
    })
  },
  layout: 'app',
  middleware: 'is-authenticated',
  async asyncData({ params }) {
    const slug = await params.slug
    return { slug }
  },
  computed: {
    bookmarks() {
      return this.$store.getters.bookmarks
    },
  },
  created() {
    this.$store.commit('updateActiveTagFilter', this.slug)
    this.$store.dispatch('bindBookmarks')
  },
}
</script>
