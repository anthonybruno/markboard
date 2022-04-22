<template>
  <div :ref="id" tabindex="-1" @keydown.esc="cancelEditBookmark()">
    <template v-if="isEditState">
      <form
        class="grid grid-cols-5 border-t"
        action="#"
        @submit.prevent="newTags ? updateBookmarkAndTags() : updateBookmark()"
      >
        <m-tagInput
          ref="tagInput"
          label="Tags"
          placeholder="Books Websites"
          :existing-tags="tags"
          @input="updateTags($event)"
        />

        <m-input
          class="col-span-2"
          id="url"
          ref="url"
          v-model="newUrl"
          label="Website URL"
          type="text"
          placeholder="https://youtu.be/N66hCzg7IMw"
        />
        <m-input
          id="title"
          v-model="newTitle"
          label="Title"
          type="text"
          placeholder="Music Store | Check It Out! With Dr. Steve Brule"
        />

        <div>
          <m-button
            label="Update"
            type="submit"
            @click="newTags ? updateBookmarkAndTags() : updateBookmark()"
          />
        </div>
      </form>
      <a href="#" @click.prevent="cancelEditBookmark()">Cancel</a>
    </template>

    <template v-else>
      <div class="grid grid-cols-5 border-t p-3">
        <div class="flex items-center">
          <m-button-link
            v-for="(tag, tagIndex) in tags"
            :key="tagIndex"
            :to="{ name: 'tag-slug', params: { slug: tag } }"
          >
            {{ tag }}
          </m-button-link>
        </div>
        <h2 class="col-span-2 flex items-center">
          <a :href="url">{{ title }}</a>
        </h2>
        <span class="flex justify-end items-center">{{ formatDate }}</span>
        <div class="flex justify-end items-center">
          <m-button label="Edit" @click="editBookmark()" />
          <m-button :danger="true" label="Delete" @click="deleteBookmark()" />
        </div>
      </div>
    </template>
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
