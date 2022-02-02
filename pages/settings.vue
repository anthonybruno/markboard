<template>
  <div>
    <h1>Settings</h1>

    <form @submit.prevent="updatePassword()">
      <input v-model="password" type="password" />
      <input type="submit" value="Update password" />
    </form>

    <form @submit.prevent="updateEmail()">
      <input v-model="email" type="email" />
      <input type="submit" value="Update email" />
    </form>

    <a id="delete-link" href="#" @click.prevent="deleteAccount()"
      >Delete account</a
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsPage',
  layout: 'app',
  middleware: 'is-authenticated',
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    ...mapGetters({
      userEmail: 'userEmail',
      userId: 'userId',
    }),
  },
  methods: {
    async updatePassword() {
      await this.$fire.auth.currentUser.updatePassword(this.password)
      alert('Password updated')
    },
    async updateEmail() {
      await this.$fire.auth.currentUser.updateEmail(this.email)
      alert('Email updated')
    },
    async deleteAccount() {
      const currentUser = this.$fire.auth.currentUser
      const confirmDelete = await confirm(this.userId) // eslint-disable-line
      if (confirmDelete) {
        await this.$fire.firestore.collection('users').doc(this.userId).delete()
        await currentUser.delete()
        this.$fire.auth.signOut()
      }
    },
  },
}
</script>

<style scoped>
form {
  padding: 30px;
}
#delete-link {
  display: inline-block;
  margin: 30px;
}
</style>
