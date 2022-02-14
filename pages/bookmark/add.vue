<template>
  <div>
    <h1>Add a new bookmark</h1>
    <form
      action=""
      @submit.prevent="newTags ? addBookmarkAndTags() : addBookmark()"
    >
      <m-input
        id="url"
        v-model="url"
        label="Website URL"
        type="text"
        placeholder="https://youtu.be/N66hCzg7IMw"
      />

      <br /><br />

      <m-input
        id="title"
        v-model="title"
        label="Title"
        type="text"
        placeholder="Music Store | Check It Out! With Dr. Steve Brule"
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
      url: null,
      title: null,
      selectedTags: [],
      newTags: null,
    }
  },
  computed: {
    ...mapGetters(['userEmail', 'userId', 'bookmarks', 'tags']),
    hasTags() {
      return this.tags && this.tags.length > 0
    },
    hasUrlQuery() {
      // Determine if we're loading data from the chrome extension
      return this.$route.query && this.$route.query.url
    },
  },
  created() {
    if (this.hasUrlQuery) {
      this.$store.commit('updateExtensionMode', true)
      this.url = this.$route.query.url
      this.title = this.$route.query.title
    }
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
        url: this.url,
        title: this.title,
        isExtension: this.hasUrlQuery, // Determine if we're saving data from the chrome extension
      })
    },
    addBookmark() {
      this.$store.dispatch('createBookmark', {
        url: this.url,
        title: this.title,
        tags: this.selectedTags,
        isExtension: this.hasUrlQuery, // Determine if we're saving data from the chrome extension
      })
    },
  },
}
</script>
