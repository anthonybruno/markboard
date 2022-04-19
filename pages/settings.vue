<template>
  <div>
    <h1>Settings</h1>

    <p v-if="message">{{ message }}</p>

    <template v-if="displayForms">
      <form action="" @submit.prevent="updateEmail()">
        <m-input
          id="email"
          :value="savedEmail"
          label="Email"
          type="email"
          @input="updatedEmail = $event"
        />
        <m-input
          v-if="updatedEmail"
          id="password"
          v-model="currentPassword"
          label="Current password"
          type="password"
        />
        <m-button label="Update email" type="submit" @click="updateEmail()" />
      </form>

      <br /><br />

      <form action="" @submit.prevent="updatePassword()">
        <m-input
          id="current-password"
          v-model="currentPassword"
          label="Current password"
          type="password"
        />
        <m-input
          id="new-password"
          v-model="newPassword"
          label="New password"
          type="password"
        />
        <m-button
          label="Change password"
          type="submit"
          @click="updatePassword()"
        />
      </form>

      <br /><br />
    </template>

    <p v-if="confirmDelete">
      Are you sure? There is no recovery.
      <a href="" @click.prevent="deleteAccount()">Let it rip.</a>
    </p>

    <m-button
      v-else
      label="Delete account"
      type="button"
      variant="secondary"
      @click="promptDelete()"
    />
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
      updatedEmail: null,
      currentPassword: null,
      newPassword: null,
      confirmDelete: false,
      message: null,
    }
  },
  computed: {
    ...mapGetters({
      savedEmail: 'email',
      userId: 'userId',
      loginType: 'providerId',
    }),
    displayForms() {
      return this.loginType === 'password'
    },
  },
  methods: {
    // async updatePassword() {
    //   await this.$fire.auth.currentUser.updatePassword(this.password)
    //   alert('Password updated')
    // },
    authCheck() {
      const currentUser = this.$fire.auth.currentUser
      const creds = this.$fireModule.auth.EmailAuthProvider.credential(
        this.savedEmail,
        this.currentPassword
      )
      return currentUser.reauthenticateWithCredential(creds)
    },
    updateEmail() {
      this.authCheck()
        .then(() => this.$fire.auth.currentUser.updateEmail(this.updatedEmail))
        .then(() => {
          this.$store.commit('updateAuthUser', {
            authUser: {
              uid: this.$fire.auth.currentUser.uid,
              email: this.$fire.auth.currentUser.email,
            },
          })
          this.updatedEmail = null
          this.password = null
          this.message = 'Email successfully updated'
        })
        .catch((err) => {
          this.message = this.$handleAuthResponse(err.code).response
        })
    },
    updatePassword() {
      this.authCheck()
        .then(() =>
          this.$fire.auth.currentUser.updatePassword(this.newPassword)
        )
        .then(() => {
          this.currentPassword = null
          this.newPassword = null
          this.message = 'Password successfully updated'
        })
        .catch((err) => {
          console.log(err.code)
          this.message = this.$handleAuthResponse(err.code).response
        })
    },
    promptDelete() {
      this.confirmDelete = true
    },
    async deleteAccount() {
      const currentUser = this.$fire.auth.currentUser
      await this.$fire.firestore.collection('users').doc(this.userId).delete()
      await currentUser.delete()
      this.$fire.auth.signOut()
    },
  },
}
</script>

<style scoped>
#delete-link {
  display: inline-block;
  margin: 30px;
}
</style>
