<template>
  <div>
    <h1>Add a new bookmark</h1>
    <form
      action=""
      @submit.prevent="newTags ? addBookmarkAndTags() : addBookmark()"
    >
      <m-input
        id="name"
        v-model="name"
        label="Website URL"
        type="text"
        placeholder="https://youtu.be/N66hCzg7IMw"
      />

      <br /><br />
      <m-tagInput
        label="Tags"
        :filter="false"
        ref-name="addInput"
        placeholder="Books Websites"
        @input="updateTags($event)"
      />
      <br /><br />

      <m-button
        label="Save bookmark"
        @click="newTags ? addBookmarkAndTags() : addBookmark()"
      />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BookmarkAdd',
  layout: 'app',
  data() {
    return {
      name: null,
      selectedTags: [],
      newTags: null,
    }
  },
  computed: {
    ...mapGetters({
      userEmail: 'userEmail',
      userId: 'userId',
      bookmarks: 'bookmarks',
      tags: 'tags',
    }),
    hasTags() {
      return this.tags && this.tags.length > 0
    },
  },
  methods: {
    updateTags({ newTags, selectedTags }) {
      this.newTags = newTags
      this.selectedTags = selectedTags
    },
    addBookmarkAndTags() {
      this.$store.dispatch('batchCreateBookmarkTags', {
        newTags: this.newTags,
        selectedTags: this.selectedTags,
        name: this.name,
      })
    },
    addBookmark() {
      this.$store.dispatch('createBookmark', {
        name: this.name,
        tags: this.selectedTags,
      })
    },
  },
}
</script>

<style scoped>
.saved-tags ul {
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  list-style: none;
}
.saved-tags li {
  display: inline-block;
  padding: 5px 10px;
}
.saved-tags label {
  display: inline-block;
  font-weight: 400;
  font-style: italic;
}
</style>
