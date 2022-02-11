import { vuexfireMutations, firestoreAction } from 'vuexfire'

const getDefaultState = () => {
  return {
    userId: null,
    bookmarks: null,
    tags: [],
    tagFilter: null,
    activeEditBookmark: null,
    extensionMode: false,
  }
}

// export const state = getDefaultState()
export const state = getDefaultState()

export const getters = {
  bookmarks(state) {
    return state.bookmarks
  },
  tags(state) {
    return state.tags
  },
  userId(state) {
    return state.userId
  },
  activeEditBookmark(state) {
    return state.activeEditBookmark
  },
  extensionMode(state) {
    return state.extensionMode
  },
}

export const mutations = {
  resetDefaultState(state) {
    Object.assign(state, getDefaultState())
  },
  authUser() {
    this.app.router.push({ name: 'index' })
  },
  updateExtensionMode(state, isActiveBool) {
    state.extensionMode = isActiveBool
  },
  updateTags(state, tagsArr) {
    state.tags = tagsArr
  },
  appendTags(state, tag) {
    state.tags.push(tag)
    state.tags = state.tags.sort()
  },
  updateActiveTagFilter(state, tag) {
    state.tagFilter = tag
  },
  updateActiveEditBookmark(state, bookmarkId) {
    state.activeEditBookmark = bookmarkId
  },
  appendBookmark(state, bookmarkObj) {
    state.bookmarks = [bookmarkObj, ...state.bookmarks]
  },
  updateAuthUser(state, { authUser, isLoggingIn }) {
    const { uid } = authUser
    state.userId = uid
    if (isLoggingIn) this.app.router.push({ name: 'index' })
  },
  ...vuexfireMutations,
}

export const actions = {
  bindBookmarks: firestoreAction(async function ({ state, bindFirestoreRef }) {
    let ref = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .orderBy('createdAt', 'desc')
    if (state.tagFilter)
      ref = ref.where('tags', 'array-contains', state.tagFilter)

    await bindFirestoreRef('bookmarks', ref, { reset: false })
  }),
  unbindBookmarks: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('bookmarks', false)
  }),
  bindTags: firestoreAction(async function ({ state, bindFirestoreRef }) {
    const ref = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('tags')
      .orderBy('name', 'asc')
    await bindFirestoreRef('tags', ref, { wait: true })
  }),
  unbindTags: firestoreAction(function ({ unbindFirestoreRef }) {
    unbindFirestoreRef('tags', false)
  }),
  async createBookmark({ commit, state }, { url, title, tags, isExtension }) {
    const route = isExtension ? 'bookmark-goodbye' : 'index'
    const docRef = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc()
    const bookmarkObj = {
      id: docRef.id,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      url,
      title,
      tags,
    }
    await docRef.set(bookmarkObj)
    this.$router.push({ name: route })
  },
  async updateBookmark({ commit, state }, { bookmarkId, url, title, tags }) {
    const docRef = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc(bookmarkId)
    const bookmarkObj = {
      lastUpdated: Date.now(),
      url,
      title,
      tags,
    }
    await docRef.update(bookmarkObj)
    commit('updateActiveEditBookmark', null)
  },
  async deleteBookmark({ state }, bookmarkId) {
    await this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc(bookmarkId)
      .delete()
  },
  async createTag({ commit, state }, tagName) {
    await this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('tags')
      .doc(tagName)
      .set({
        name: tagName,
      })
    commit('appendTags', tagName)
  },
  async batchCreateBookmarkTags(
    { state },
    { newTags, selectedTags, url, title, isExtension }
  ) {
    const route = isExtension ? 'bookmark-goodbye' : 'index'
    const batch = await this.$fire.firestore.batch()
    const bookmarkRef = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc()

    newTags.forEach((newTag) => {
      const tagRef = this.$fire.firestore
        .collection('users')
        .doc(state.userId)
        .collection('tags')
        .doc(newTag)
      batch.set(tagRef, {
        name: newTag,
      })
    })

    batch.set(bookmarkRef, {
      id: bookmarkRef.id,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      url,
      title,
      tags: [...newTags, ...selectedTags],
    })

    batch.commit()
    this.$router.push({ name: route })
  },
  async batchUpdateBookmarkTags(
    { commit, state },
    { bookmarkId, newTags, selectedTags, name }
  ) {
    const batch = await this.$fire.firestore.batch()
    const bookmarkRef = this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc(bookmarkId)

    newTags.forEach((newTag) => {
      const tagRef = this.$fire.firestore
        .collection('users')
        .doc(state.userId)
        .collection('tags')
        .doc(newTag)
      batch.set(tagRef, {
        name: newTag,
      })
    })

    batch.update(bookmarkRef, {
      lastUpdated: Date.now(),
      name,
      tags: [...newTags, ...selectedTags],
    })

    batch.commit()
    commit('updateActiveEditBookmark', null)
  },
  logout({ dispatch, commit }) {
    const route = this.$router.push({ name: 'signin' })
    function routerPromise() {
      return new Promise((resolve) => {
        resolve(route)
      })
    }
    routerPromise().then(() => {
      commit('resetDefaultState')
      dispatch('unbindBookmarks')
      dispatch('unbindTags')
    })
  },
  onAuthStateChanged({ dispatch, commit, state }, { authUser, claims }) {
    // https://firebase.nuxtjs.org/service-options/auth#onauthstatechangedmutation
    if (authUser) {
      commit('updateAuthUser', { authUser, isLoggingIn: state.userId === null })
    } else {
      dispatch('logout')
    }
  },
}
