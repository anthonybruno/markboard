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

      <template v-if="hasTags">
        <h5>Pre-existing tags:</h5>

        <div class="saved-tags">
          <ul>
            <li v-for="tag in tags" :key="tag">
              <input
                :id="tag"
                v-model="selectedSavedTags"
                class="form-check-input"
                type="checkbox"
                :value="tag"
              />
              <label :for="tag">
                {{ tag }}
              </label>
            </li>
          </ul>
        </div>

        <m-input
          id="new-tags"
          v-model="newTags"
          type="text"
          placeholder="...or add tags on submit"
        />
        <p>
          <em>"pizza hut" will be saved as two tags</em>
        </p>
        <br /><br />
      </template>

      <template v-else>
        <br /><br />
        <h2>Want to assign some tags to your bookmark?</h2>
        <p>
          <strong>Heads up:</strong>
          Just know that tags can only be single words. If you want to add
          multiple tags, just add a space between words.
          <br /><br />
          <em>For example.. "pizza hut" will be saved as two tags</em>
        </p>
        <br />
        <m-input
          id="new-tags"
          v-model="newTags"
          label="My first tags are:"
          type="text"
          placeholder="pizza hut"
        />
        <br /><br />
      </template>

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
      selectedSavedTags: [],
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
    formattedNewTags() {
      if (this.newTags) return this.newTags.split(' ')
      return null
    },
  },
  created() {
    this.$store.dispatch('getAllTags')
  },
  methods: {
    addBookmarkAndTags() {
      const batch = this.$fire.firestore.batch()
      const bookmarkRef = this.$fire.firestore
        .collection('users')
        .doc(this.userId)
        .collection('bookmarks')
        .doc()

      this.formattedNewTags.forEach((newTag) => {
        const tagRef = this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .collection('tags')
          .doc(newTag)
        batch.set(tagRef, {
          name: newTag,
        })
      })

      batch.set(bookmarkRef, {
        createdAt: Date.now(),
        name: this.name,
        tags: this.formattedNewTags,
      })

      batch.commit().then(() => {
        this.$router.push({ name: 'index' })
      })
    },
    addBookmark() {
      this.$store
        .dispatch('createBookmark', {
          name: this.name,
          tags: this.selectedSavedTags,
        })
        .then(() => {
          this.$router.push({ name: 'index' })
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
