<template>
  <div
    :ref="id"
    class="bookmark"
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

      <m-input
        id="url"
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
        @click="newTags ? updateBookmarkAndTags() : updateBookmark()"
      />
    </template>

    <template v-else>
      <header>
        <div class="details">
          <h2>
            <a :href="url">{{ title }}</a>
          </h2>
          <em>{{ formatDate }}</em>
        </div>

        <div class="actions">
          <ul>
            <li>
              <a href="#" @click.prevent="editBookmark()">Edit</a>
            </li>
            <li>
              <a href="#" @click.prevent="deleteBookmark()">Delete</a>
            </li>
          </ul>
        </div>
      </header>

      <div class="main">
        <ul v-if="hasTags" class="tags">
          <li><strong>Tagged</strong></li>
          <li v-for="(tag, tagIndex) in tags" :key="tagIndex">
            <NuxtLink :to="{ name: 'tag-slug', params: { slug: tag } }">
              {{ tag }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      userId: 'userId',
      activeEditBookmark: 'activeEditBookmark',
    }),
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
    editBookmark() {
      this.$store.commit('updateActiveEditBookmark', this.id)
      this.$refs[this.id].focus()
    },
    cancelEditBookmark() {
      this.$store.commit('updateActiveEditBookmark', null)
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

<style scoped>
.bookmark {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
}
.bookmark + .bookmark {
  margin-top: 20px;
}

header {
  padding-bottom: 5px;
  overflow: hidden;
}

header h2 {
  font-size: 20px;
  margin: 0;
}

header .details {
  float: left;
}
header .actions {
  float: right;
}

header ul,
.main ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.main li {
  display: inline-block;
}
.main li + li {
  padding-left: 5px;
}
.tags a {
  color: #00a5e0;
}
</style>
