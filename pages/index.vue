<template>
  <div>
    <template v-if="!hasBookmarks">
      <h1>Looks like you don't have any bookmarks yet ya doofus!</h1>
      <NuxtLink :to="{ name: 'bookmark-add' }">Add a bookmark</NuxtLink>
    </template>

    <template v-else>
      <h1>
        Bookmarks
        <NuxtLink :to="{ name: 'bookmark-add' }">+</NuxtLink>
      </h1>
      <m-bookmark
        v-for="bookmark in bookmarks"
        :id="bookmark.id"
        :key="bookmark.id"
        :name="bookmark.name"
        :created="bookmark.createdAt"
        :tags="bookmark.tags"
      />
    </template>
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
      syncDocs: [],
    }
  },
  computed: {
    ...mapGetters({
      userId: 'userId',
      bookmarks: 'bookmarks',
      tags: 'tags',
    }),
    formattedNewTags() {
      if (this.newTags) return this.newTags.split(' ')
      return null
    },
    hasBookmarks() {
      return this.bookmarks && this.bookmarks.length > 0
    },
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
    updateTagSearch(tags) {
      if (tags.selectedTags.length === 1) {
        this.$router.push({
          name: 'tag-slug',
          params: { slug: tags.selectedTags[0] },
        })
      }
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

    // getTags() {
    //   this.$store.dispatch('getAllTags')
    // },

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
