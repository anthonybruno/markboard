<template>
  <div>
    <template v-if="!hasBookmarks">
      <h1 class="pb-5">
        Looks like you don't have any bookmarks yet ya doofus!
      </h1>
      <NuxtLink :to="{ name: 'bookmark-add' }">Add a bookmark</NuxtLink>
    </template>

    <template v-else>
      <m-bookmark-form :edit="false" v-if="addMode" />
      <template v-for="(bookmark, index) in bookmarks">
        <m-bookmark-form
          v-if="activeEditBookmark === bookmark.id"
          :key="index"
          :id="bookmark.id"
          :title="bookmark.title"
          :url="bookmark.url"
          :created="bookmark.createdAt"
          :tags="bookmark.tags"
        />
        <m-bookmark
          v-else
          :key="bookmark.id"
          :id="bookmark.id"
          :edit="true"
          :title="bookmark.title"
          :url="bookmark.url"
          :created="bookmark.createdAt"
          :tags="bookmark.tags"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'app',
  middleware: 'is-authenticated',
  computed: {
    ...mapGetters(['activeEditBookmark', 'bookmarks', 'addMode']),
    hasBookmarks() {
      return this.bookmarks && this.bookmarks.length > 0
    },
  },
}
</script>
