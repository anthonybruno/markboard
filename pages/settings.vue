<template>
  <div class="flex h-full justify-center items-center">
    <div class="text-center">
      <h1 class="pb-5">Settings</h1>
      <p v-if="confirmDelete">
        Are you sure? There is no recovery.
        <a
          class="text-rose-800 underline hover:no-underline"
          href=""
          @click.prevent="deleteAccount()"
          >Let it rip.</a
        >
      </p>
      <m-button
        v-else
        label="Delete account"
        type="button"
        :danger="true"
        @click="promptDelete()"
      />
    </div>
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
      confirmDelete: false,
    }
  },
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
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
