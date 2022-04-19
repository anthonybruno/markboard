<template>
  <div>
    <template v-if="!hasBookmarks">
      <h1 class="pb-5">
        Looks like you don't have any bookmarks yet ya doofus!
      </h1>
      <NuxtLink :to="{ name: 'bookmark-add' }">Add a bookmark</NuxtLink>
    </template>

    <template v-else>
      <h1 class="pb-5">
        Bookmarks
        <NuxtLink :to="{ name: 'bookmark-add' }">+ Add</NuxtLink>
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
export default {
  name: 'IndexPage',
  layout: 'app',
  middleware: 'is-authenticated',
  computed: {
    bookmarks() {
      return this.$store.getters.bookmarks
    },
    hasBookmarks() {
      return this.bookmarks && this.bookmarks.length > 0
    },
  },
}
</script>
