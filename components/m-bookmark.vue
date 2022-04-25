<template>
  <div :ref="id" tabindex="-1" @keydown.esc="cancelEditBookmark()">
    <div class="flex flex-col md:grid md:grid-cols-5 border-t p-3">
      <div class="md:flex md:items-center flex-wrap">
        <m-button-link
          v-for="(tag, tagIndex) in tags"
          :key="tagIndex"
          :to="{ name: 'tag-slug', params: { slug: tag } }"
        >
          {{ tag }}
        </m-button-link>
      </div>
      <h2 class="md:col-span-2 md:flex md:items-center pt-3 md:pt-0">
        <a :href="url">{{ title }}</a>
      </h2>
      <span class="md:flex md:justify-end md:items-center pb-3 md:pb-0">
        {{ formatDate }}
      </span>
      <div class="md:flex md:justify-end md:items-center">
        <m-button label="Edit" @click="editBookmark()" />
        <m-button :danger="true" label="Delete" @click="deleteBookmark()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookmarkItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    created: {
      type: Number,
      default: null,
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newUrl: this.url,
      newTitle: this.title,
      newTags: null,
      selectedTags: this.tags,
    }
  },
  computed: {
    activeEditBookmark() {
      return this.$store.getters.activeEditBookmark
    },
    hasTags() {
      return this.tags.length > 0
    },
    formatDate() {
      return this.$dateFns.formatDistance(this.created, new Date(), {
        addSuffix: true,
      })
    },
    isEditState() {
      return false
    },
  },
  methods: {
    updateBookmarkAndTags() {
      this.$store.dispatch('batchUpdateBookmarkTags', {
        bookmarkId: this.id,
        newTags: this.newTags,
        selectedTags: this.selectedTags,
        url: this.newUrl,
        title: this.newTitle,
      })
    },
    updateBookmark() {
      this.$store.dispatch('updateBookmark', {
        bookmarkId: this.id,
        url: this.newUrl,
        title: this.newTitle,
        tags: this.selectedTags,
      })
    },
    async editBookmark() {
      await this.$store.dispatch('updateBookmarkEdit', this.id)
      // this.$refs.url.$refs.input.focus()
    },
    async cancelEditBookmark() {
      await this.$store.dispatch('updateBookmarkEdit', null)
      this.$refs[this.id].blur()
    },
    deleteBookmark() {
      this.$store.dispatch('deleteBookmark', this.id)
    },
    updateTags({ newTags, selectedTags }) {
      this.$refs.tagInput.$refs.tagInput.$refs.input.focus()
      this.newTags = newTags
      this.selectedTags = selectedTags
    },
  },
}
</script>
