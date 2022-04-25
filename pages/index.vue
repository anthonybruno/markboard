<template>
  <div :class="{ 'border-b': noBookmarks }">
    <m-bookmark-form v-if="addMode || noBookmarks" :edit="false" />
    <template v-for="(bookmark, index) in bookmarks">
      <m-bookmark-form
        v-if="activeEditBookmark === bookmark.id"
        :id="bookmark.id"
        :key="index"
        :title="bookmark.title"
        :url="bookmark.url"
        :created="bookmark.createdAt"
        :tags="bookmark.tags"
        :edit="true"
      />
      <m-bookmark
        v-else
        :id="bookmark.id"
        :key="bookmark.id"
        :edit="true"
        :title="bookmark.title"
        :url="bookmark.url"
        :created="bookmark.createdAt"
        :tags="bookmark.tags"
      />
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
    noBookmarks() {
      return this.bookmarks && this.bookmarks.length === 0
    },
  },
}
</script>
