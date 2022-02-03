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
      :name="bookmark.name"
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
  // data() {
  //   return {
  //     name: null,
  //     tagName: null,
  //     selectedTags: [],
  //     newTags: null,
  //     tagQuery: null,
  //     bookmarkLimit: 100,
  //     hasPreviousEntries: false,
  //     syncDocs: [],
  //   }
  // },
  computed: {
    ...mapGetters({
      userEmail: 'userEmail',
      userId: 'userId',
      bookmarks: 'bookmarks',
      tags: 'tags',
    }),
    formattedNewTags() {
      if (this.newTags) return this.newTags.split(' ')
      return null
    },
    hasBookmarks() {
      return this.bookmarks && this.bookmarks.length > 0
    },
  },
  created() {
    this.$store.commit('updateActiveTagFilter', this.slug)
    this.$store.dispatch('bindBookmarks')
  },
  methods: {
    async getBookmarksWithTag(tag) {
      const bookmarks = []
      const bookmarksRef = await this.$fire.firestore
        .collection('users')
        .doc(this.userId)
        .collection('bookmarks')
        .where('tags', 'array-contains', tag)
        .get()
      bookmarksRef.forEach((bookmark) => {
        bookmarks.push({ id: bookmark.id, data: bookmark.data() })
      })
      this.bookmarks = bookmarks
    },
  },
}
</script>

<style scoped></style>
