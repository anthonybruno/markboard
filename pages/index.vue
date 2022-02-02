<template>
  <div>
    <h1>Welcome {{ userEmail }}</h1>

    <h4>Create bookmark</h4>
    <m-input id="name" v-model="name" type="text" placeholder="Bookmark name" />

    <template v-if="tags.length > 0">
      <div v-for="tag in tags" :key="tag">
        <input
          :id="tag"
          v-model="selectedTags"
          class="form-check-input"
          type="checkbox"
          :value="tag"
        />
        {{ tag }}
      </div>
    </template>
    <br />

    <m-input
      id="new-tags"
      v-model="newTags"
      type="text"
      placeholder="Add new tag"
    />
    <m-button
      label="Add bookmark"
      @click="newTags ? addBookmarkAndTags() : addBookmark()"
    />

    <br /><br />
    <h5>Tags</h5>
    <m-input
      id="add-tag"
      v-model="tagName"
      label="Add tag"
      type="text"
      placeholder="Add new tag"
    />
    <m-button label="Add tag" @click="addTag()" />

    <br /><br />
    <h5>Bookmarks</h5>

    <m-input
      id="bookmark-limit"
      v-model="bookmarkLimit"
      label="Number of bookmarks to return"
      type="text"
      placeholder="100"
    />
    <m-button label="Get bookmarks" @click="getAllBookmarks()" />

    <br /><br />

    <m-bookmark
      v-for="bookmark in bookmarks"
      :id="bookmark.id"
      :key="bookmark.id"
      :name="bookmark.name"
      :created="bookmark.createdAt"
      :tags="bookmark.tags"
    />

    <br /><br /><br />
  </div>
</template>

<script>
// import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'app',
  middleware: 'is-authenticated',
  data() {
    return {
      name: null,
      tagName: null,
      selectedTags: [],
      newTags: null,
      tagQuery: null,
      bookmarkLimit: 100,
      hasPreviousEntries: false,
    }
  },
  computed: {
    ...mapGetters({
      userEmail: 'userEmail',
      userId: 'userId',
      bookmarks: 'bookmarks',
      tags: 'tags',
    }),
    formattedNewTags() {
      if (this.newTags) return this.newTags.split(' ')
      return null
    },
  },
  created() {
    this.getTags()
    this.getAllBookmarks()
  },
  methods: {
    // async filterBookmarks(filterVal) {
    //   const bookmarks = []
    //   const bookmarksRef = await this.$fire.firestore
    //     .collection('bookmarks')
    //     .where('owner', '==', this.userId)
    //     .where('tags', 'array-contains', filterVal)
    //     .get()
    //   bookmarksRef.forEach((bookmark) => {
    //     bookmarks.push({ id: bookmark.id, data: bookmark.data() })
    //   })
    //   this.bookmarks = bookmarks
    // },
    // async createBookmark() {
    //   await this.$fire.firestore.collection('bookmarks').add({
    //     createdAt: Date.now(),
    //     owner: this.userId,
    //     name: this.name,
    //     tags: this.formattedTags,
    //   })
    // },
    // async createBatchBookmark() {
    //   const bookmarkId = uuidv4() // eslint-disable-line
    //   const tagId = this.tags
    //   const batch = this.$fire.firestore.batch()
    //   const bookmarkRef = this.$fire.firestore
    //     .collection('bookmarks')
    //     .doc(bookmarkId)
    //   const tagRef = this.$fire.firestore.collection('tags').doc(tagId)
    //   const tagSubRef = this.$fire.firestore
    //     .collection('tags')
    //     .doc(tagId)
    //     .collection('owners')
    //     .doc(this.userId)
    //   batch.set(bookmarkRef, {
    //     createdAt: Date.now(),
    //     owner: this.userId,
    //     name: this.name,
    //     tags: [tagId],
    //   })
    //   batch.set(tagRef, { name: this.tags }, { merge: true })
    //   batch.set(tagSubRef, {})

    //   // Create bookmark with unique ID
    //   // Run a "set" on each tag in the tags collection
    //   // Tag should be created with some sort of user id within the document ID foooo-tagname
    //   // Each tag contains the bookmarkID and user id
    //   // Set a merge to true https://stackoverflow.com/a/61169787

    //   await batch.commit()
    // },
    getAllBookmarks() {
      // const bookmarks = []
      // const bookmarksRef = await this.$fire.firestore
      //   .collection('users')
      //   .doc(this.userId)
      //   .collection('bookmarks')
      //   .orderBy('createdAt', 'desc')
      //   .limit(this.bookmarkLimit)
      //   .get()
      // bookmarksRef.forEach((bookmark) => {
      //   bookmarks.push({ id: bookmark.id, data: bookmark.data() })
      // })
      // this.bookmarks = bookmarks
      this.$store.dispatch('getAllBookmarks')
    },
    async getBookmarksWithTag(tag) {
      const bookmarks = []
      const bookmarksRef = await this.$fire.firestore
        .collection('users')
        .doc(this.userId)
        .collection('bookmarks')
        .where('tags', 'array-contains', tag)
        .get()
      bookmarksRef.forEach((bookmark) => {
        bookmarks.push({ id: bookmark.id, data: bookmark.data() })
      })
      this.bookmarks = bookmarks
    },

    getTags() {
      this.$store.dispatch('getAllTags')
    },

    addTag() {
      this.$store.dispatch('createTag', this.tagName)
    },
    addBookmark() {
      this.$store.dispatch('createBookmark', {
        name: this.name,
        tags: this.selectedTags,
      })

      // this.$fire.firestore
      //   .collection('users')
      //   .doc(this.userId)
      //   .collection('bookmarks')
      //   .add({
      //     createdAt: Date.now(),
      //     lastUpdated: Date.now(),
      //     name: this.name,
      //     tags: this.selectedTags,
      //   })
    },
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

      batch.commit()
    },
    deleteBookmark(bookmarkId) {
      this.$fire.firestore
        .collection('users')
        .doc(this.userId)
        .collection('bookmarks')
        .doc(bookmarkId)
        .delete()
    },
  },
}
</script>

<style scoped>
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
