const getDefaultState = () => {
  return {
    userEmail: null,
    userId: null,
    userVerifiedEmail: null,
    bookmarks: [],
    tags: [],
  }
}

export const state = getDefaultState()

export const getters = {
  bookmarks(state) {
    return state.bookmarks
  },
  tags(state) {
    return state.tags
  },
  userEmail(state) {
    return state.userEmail
  },
  userId(state) {
    return state.userId
  },
}

export const mutations = {
  resetDefaultState(state) {
    Object.assign(state, getDefaultState())
  },
  authUser() {
    this.app.router.push({ name: 'index' })
  },
  updateBookmarks(state, bookmarksArr) {
    state.bookmarks = bookmarksArr
  },
  updateTags(state, tagsArr) {
    state.tags = tagsArr
  },
  appendTags(state, tag) {
    state.tags.push(tag)
    state.tags = state.tags.sort()
  },
  appendBookmark(state, bookmarkObj) {
    state.bookmarks = [bookmarkObj, ...state.bookmarks]
  },
  updateAuthUser(state, { authUser, isLoggingIn }) {
    const { uid, email, emailVerified } = authUser
    state.userId = uid
    state.userEmail = email
    state.userVerifiedEmail = emailVerified
    if (isLoggingIn) this.app.router.push({ name: 'index' })
  },
}

export const actions = {
  async getAllBookmarks({ commit, state }) {
    const bookmarks = []
    const bookmarksRef = await this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .orderBy('createdAt', 'desc')
      .get()
    bookmarksRef.forEach((bookmark) => {
      bookmarks.push({ id: bookmark.id, ...bookmark.data() })
    })
    commit('updateBookmarks', bookmarks)
  },
  async createBookmark({ commit, state }, { name, tags }) {
    const bookmarkObj = {
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      name,
      tags,
    }
    await this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('bookmarks')
      .doc()
      .set(bookmarkObj)
    commit('appendBookmark', bookmarkObj)
  },
  async getAllTags({ commit, state }) {
    const tags = []
    const tagsRef = await this.$fire.firestore
      .collection('users')
      .doc(state.userId)
      .collection('tags')
      .orderBy('name', 'asc')
      .get()
    tagsRef.forEach((tag) => {
      tags.push(tag.data().name)
    })
    commit('updateTags', tags)
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
  onAuthStateChanged({ commit, state }, { authUser, claims }) {
    // https://firebase.nuxtjs.org/service-options/auth#onauthstatechangedmutation
    if (authUser) {
      commit('updateAuthUser', { authUser, isLoggingIn: state.userId === null })
    } else {
      // Logout
      commit('resetDefaultState')
      this.app.router.push({ name: 'signin' })
    }
  },
}
