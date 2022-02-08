<template>
  <div class="tag-input">
    <m-input
      id="tags"
      v-model="query"
      ref-name="newTagInput"
      label="Tags"
      type="text"
      placeholder="food blogs"
      @input="emitTags()"
      @up="keyboardSelectTag('up')"
      @down="keyboardSelectTag('down')"
      @enter.prevent="keyboardEnter()"
    />
    <ul v-if="filteredSavedTags.length > 0">
      <li
        v-for="(tag, tagIndex) in filteredSavedTags"
        :key="tagIndex"
        :class="[{ selected: keyTagIndex === tagIndex }]"
        @mouseover="keyTagIndex = tagIndex"
      >
        <a href="#" @click.prevent="tagChosen(tag.name)">{{ tag.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TagInput',
  data() {
    return {
      query: null,
      keyTagIndex: 0,
    }
  },
  computed: {
    ...mapGetters({
      // userEmail: 'userEmail',
      // userId: 'userId',
      // bookmarks: 'bookmarks',
      tags: 'tags',
    }),
    formattedAllTags() {
      const formatted = []
      if (this.tags) {
        this.tags.forEach((tag) => formatted.push(tag.name))
        return formatted
      }
      return null
    },
    newestQuery() {
      if (this.query) return this.query.split(' ').pop()
      return null
    },
    filteredSavedTags() {
      if (this.newestQuery) {
        return this.tags.filter((tag) => {
          return tag.name.includes(this.newestQuery)
        })
      }
      return []
    },
    cleanedChosenTags() {
      if (this.query) return this.query.trim().split(' ')
      return null
    },
  },
  methods: {
    tagChosen(name) {
      const queryArr = this.query.split(' ')
      queryArr.pop()
      queryArr.push(name)
      this.query = `${queryArr.join(' ')} `
      this.$store.commit('updateRefInFocus', null)
      this.$store.commit('updateRefInFocus', 'newTagInput')
      this.emitTags()
    },
    emitTags() {
      const tagObj = {
        newTags: [],
        selectedTags: [],
      }
      this.resetSelectedKeyTagIndex()
      if (this.cleanedChosenTags) {
        this.cleanedChosenTags.forEach((tag) => {
          if (this.formattedAllTags.includes(tag)) {
            tagObj.selectedTags.push(tag)
          } else {
            tagObj.newTags.push(tag)
          }
        })
        this.$emit('input', tagObj)
      }
    },
    keyboardSelectTag(direction) {
      if (direction === 'up' && this.keyTagIndex > 0) this.keyTagIndex--
      if (direction === 'down') this.keyTagIndex++
    },
    keyboardEnter() {
      this.tagChosen(this.filteredSavedTags[this.keyTagIndex].id)
      this.resetSelectedKeyTagIndex()
    },
    resetSelectedKeyTagIndex() {
      this.keyTagIndex = 0
    },
  },
}
</script>

<style scoped>
.tag-input {
  position: relative;
  display: inline-block;
}
ul {
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #999;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
}
li.selected {
  background-color: #f2cc8f;
}
li a {
  display: block;
  color: #000;
  text-decoration: none;
  padding: 3px;
}
</style>
