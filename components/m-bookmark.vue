<template>
  <div class="bookmark">
    <h2>{{ name }}</h2>
    <h6>{{ formatDate }}</h6>
    <ul v-if="hasTags">
      <li v-for="(tag, tagIndex) in tags" :key="tagIndex">
        {{ tag }}
      </li>
    </ul>
    <a href="#" @click.prevent="deleteBookmark(bookmark.id)"> Delete </a>
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
    name: {
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
  computed: {
    hasTags() {
      return this.tags.length > 0
    },
    formatDate() {
      return this.$dateFns.formatDistance(this.created, new Date(), {
        addSuffix: true,
      })
    },
  },
}
</script>

<style scoped>
.bookmark {
  width: 300px;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  background-color: #eee;
}
ul {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  display: inline-block;
  padding-right: 5px;
}
h2,
h6 {
  margin: 0;
}
</style>
