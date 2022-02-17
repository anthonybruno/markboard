<template>
  <div class="wrap">
    <div class="inner">
      <ol>
        <template v-if="!goodbye">
          <li><h2>mrkbrd</h2></li>
          <li><p>another bookmarking web application</p></li>
          <li><p>soon</p></li>
          <template v-if="inquiry">
            <li>
              <form action="" @submit.prevent="submitInquiry()">
                <input ref="input" v-model="email" type="email" />
                <input id="name" v-model="name" type="text" />
                <button
                  v-if="validEmail"
                  type="submit"
                  value="go"
                  @click.prevent="submitInquiry()"
                >
                  execute
                </button>
              </form>
            </li>
          </template>
          <li v-else>
            <button type="button" @click.prevent="initInquiry()">
              tell me when
            </button>
          </li>
        </template>
        <h2 v-else>さようなら</h2>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Soon',
  layout: 'soon',
  data() {
    return {
      name: null,
      email: null,
      goodbye: false,
      inquiry: false,
    }
  },
  computed: {
    validEmail() {
      const format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      return format.test(this.email)
    },
  },
  methods: {
    initInquiry() {
      this.inquiry = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    async submitInquiry() {
      if (this.validEmail && this.name === null) {
        await this.$fire.firestore.collection('signups').doc().set({
          email: this.email,
        })
        this.goodbye = true
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,700;1,400&display=swap');

* {
  font-family: 'Anonymous Pro', monospace;
  font-size: 16px;
  line-height: 1;
}

h2 {
  margin: 0;
  color: #bb4430;
  font-weight: 700;
}

.goodbye {
  height: 22px;
}

p,
input {
  font-style: italic;
}

.wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#name {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
}

@media (prefers-color-scheme: dark) {
  .wrap {
    background-color: #000;
  }
}
</style>
