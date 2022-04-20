<template>
  <div
    :ref="id"
    class="pb-10 relative"
    tabindex="-1"
    @keydown.esc="cancelEditBookmark()"
  >
    <template v-if="isEditState">
      <header>
        <div class="actions">
          <ul>
            <li>
              <a href="#" @click.prevent="cancelEditBookmark()">Cancel</a>
            </li>
          </ul>
        </div>
      </header>

      <form
        action="#"
        @submit.prevent="newTags ? updateBookmarkAndTags() : updateBookmark()"
      >
        <m-input
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
        <m-tagInput
          ref="tagInput"
          label="Tags"
          placeholder="Books Websites"
          :existing-tags="tags"
          @input="updateTags($event)"
        />

        <br /><br />
        <m-button
          label="Update"
          type="submit"
          @click="newTags ? updateBookmarkAndTags() : updateBookmark()"
        />
      </form>
    </template>

    <template v-else>
      <header class="flex">
        <div class="grow">
          <h2>
            <a :href="url">{{ title }}</a>
          </h2>
          <em>{{ formatDate }}</em>
        </div>
      </header>

      <div class="main">
        <ul v-if="hasTags" class="pt-5">
          <li v-for="(tag, tagIndex) in tags" :key="tagIndex">
            <m-tag :link="{ name: 'tag-slug', params: { slug: tag } }">
              {{ tag }}
            </m-tag>
          </li>
        </ul>
      </div>
      <ul class="whitespace-nowrap absolute top-0 right-full px-3">
        <li class="block">
          <a href="#" @click.prevent="editBookmark()">Edit</a>
        </li>
        <li class="block">
          <a href="#" @click.prevent="deleteBookmark()">Delete</a>
        </li>
      </ul>
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
      return this.id === this.activeEditBookmark
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
      this.$refs.url.$refs.input.focus()
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
