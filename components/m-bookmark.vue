<template>
  <div class="bookmark">
    <header>
      <div class="details">
        <h2>{{ name }}</h2>
        <em>{{ formatDate }}</em>
      </div>

      <div class="actions">
        <ul>
          <li>
            <a href="#" @click.prevent="deleteBookmark()"> Delete </a>
          </li>
        </ul>
      </div>
    </header>

    <div class="main">
      <ul v-if="hasTags">
        <li><strong>Tagged</strong></li>
        <li v-for="(tag, tagIndex) in tags" :key="tagIndex">
          {{ tag }}
        </li>
      </ul>
    </div>
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
    ...mapGetters({
      userId: 'userId',
    }),
    hasTags() {
      return this.tags.length > 0
    },
    formatDate() {
      return this.$dateFns.formatDistance(this.created, new Date(), {
        addSuffix: true,
      })
    },
  },
  methods: {
    async deleteBookmark() {
      await this.$fire.firestore
        .collection('users')
        .doc(this.userId)
        .collection('bookmarks')
        .doc(this.id)
        .delete()
      alert('Deleted! Refresh the page.')
    },
  },
}
</script>

<style scoped>
.bookmark {
  border: 3px solid rgba(0, 0, 0, 0.2);
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
</style>
