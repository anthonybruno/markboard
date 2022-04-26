<template>
  <div class="tag-input w-full block relative">
    <m-input
      id="tags"
      ref="tagInput"
      v-model="query"
      :label="label"
      type="text"
      :placeholder="placeholder"
      :search="search"
      @input="emitTags()"
      @up="keyboardSelectTag('up')"
      @down="keyboardSelectTag('down')"
      @enter.prevent="keyboardEnter()"
      @esc="resetInput()"
    />
    <ul
      v-if="filteredSavedTags.length > 0"
      class="w-64 bg-white shadow-lg rounded-lg p-3 border-2 border-black absolute top-full"
    >
      <li
        v-for="(tag, tagIndex) in filteredSavedTags"
        :key="tagIndex"
        class="cursor-pointer"
        @mouseover="keyTagIndex = tagIndex"
      >
        <a href="#" class="block" @click.prevent="tagChosen(tag.name)">{{
          tag.name
        }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TagInput',
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    existingTags: {
      type: Array,
      default: () => [],
    },
    singleValue: {
      // Only for a single value to be selected and subsequently reset
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      query: null,
      keyTagIndex: 0,
    }
  },
  computed: {
    tags() {
      return this.$store.getters.tags
    },
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
  created() {
    if (this.existingTags.length > 0)
      this.query = `${this.existingTags.join(' ')} `
  },
  methods: {
    tagChosen(name) {
      const queryArr = this.query.split(' ')
      queryArr.pop()
      queryArr.push(name)
      this.query = `${queryArr.join(' ')} `
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
        if (tagObj.selectedTags.length > 0 && this.singleValue)
          this.resetInput()
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
    resetInput() {
      this.$refs.tagInput.$refs.input.blur()
      this.query = null
    },
  },
}
</script>
