<template>
  <form
    class="w-full grid grid-cols-5 border-t"
    action="#"
    @submit.prevent="newTags ? updateBookmarkAndTags() : updateBookmark()"
  >
    <div class="border-r p-3">
      <m-tagInput
        ref="tagInput"
        label="Tags"
        placeholder="Books Websites"
        :existing-tags="tags"
        @input="updateTags($event)"
      />
    </div>
    <div class="border-r p-3 col-span-2">
      <m-input id="title" v-model="newTitle" type="text" placeholder="Title" />
    </div>
    <div class="border-r p-3">
      <m-input
        id="url"
        ref="url"
        v-model="newUrl"
        type="url"
        placeholder="URL"
      />
    </div>
    <div class="flex justify-end items-center p-3">
      <template v-if="edit === true">
        <m-button
          key="cancel"
          label="Cancel"
          type="button"
          @click="cancelUpdateBookmark()"
        />
        <m-button
          label="Update"
          :success="true"
          @click="newTags ? updateBookmarkAndTags() : updateBookmark()"
        />
      </template>
      <m-button
        v-else
        label="Add"
        :success="true"
        @click="evaulateSubmission()"
      />
      <template v-if="displayError">
        <p>Hey a URL is required</p>
      </template>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BookmarkForm',
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
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
      displayError: false,
    }
  },
  mounted() {
    if (this.edit === false)
      this.$refs.tagInput.$refs.tagInput.$refs.input.focus()
  },
  methods: {
    async cancelUpdateBookmark() {
      await this.$store.dispatch('updateBookmarkEdit', null)
    },
    evaulateSubmission() {
      if (this.edit === false && this.newUrl) {
        this.newTags ? this.addBookmarkAndTags() : this.addBookmark()
      } else {
        this.displayError = true
      }
    },
    addBookmarkAndTags() {
      this.$store.dispatch('batchCreateBookmarkTags', {
        newTags: this.newTags,
        selectedTags: this.selectedTags,
        url: this.newUrl,
        title: this.newTitle,
      })
    },
    addBookmark() {
      this.$store.dispatch('createBookmark', {
        url: this.newUrl,
        title: this.newTitle,
        tags: this.selectedTags,
      })
    },
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
    updateTags({ newTags, selectedTags }) {
      this.$refs.tagInput.$refs.tagInput.$refs.input.focus()
      this.newTags = newTags
      this.selectedTags = selectedTags
    },
  },
}
</script>
