<template>
  <div class="flex flex-col text-center w-full max-w-xs">
    <m-button
      :label="formattedGoogleLabel"
      type="button"
      class="!block !bg-blue-500 !border-blue-500 !text-white mb-2"
      @click="authWithGoogle()"
    />
    <m-button
      :label="formattedGithubLabel"
      type="button"
      class="!bg-black !border-black !text-white mb-10"
      @click="authWithGithub()"
    />

    <div v-if="displayError" class="errors">
      <p>{{ displayError.response }}</p>
    </div>

    <NuxtLink
      class="hover:no-underline"
      :to="{ name: isSignup ? 'login' : 'signup' }"
    >
      <template v-if="isSignup">Already have an account?</template>
      <template v-else>Don&rsquo;t have an account?</template>

      <span class="inline-block underline text-rose-700">
        <template v-if="isSignup">Log in</template>
        <template v-else>Sign up</template>
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  layout: 'auth',
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null,
      displayError: null,
    }
  },
  computed: {
    isSignup() {
      return this.$route.name === 'signup'
    },
    signupOrLogin() {
      if (this.isSignup) return 'Sign up'
      return 'Log in'
    },
    formattedGoogleLabel() {
      return `${this.signupOrLogin} with Google`
    },
    formattedGithubLabel() {
      return `${this.signupOrLogin} with Github`
    },
  },
  methods: {
    // async signIn() {
    //   try {
    //     await this.$fire.auth.signInWithEmailAndPassword(
    //       this.email,
    //       this.password
    //     )
    //   } catch (e) {
    //     this.displayError = this.$handleAuthResponse(e.code)
    //     this.$logError(e)
    //   }
    // },
    // async signUp() {
    //   try {
    //     await this.$fire.auth.createUserWithEmailAndPassword(
    //       this.email,
    //       this.password
    //     )
    //     this.createDefaultCollection()
    //   } catch (e) {
    //     this.displayError = this.$handleAuthResponse(e.code)
    //     this.$logError(e)
    //   }
    // },
    async createDefaultCollection() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
        await this.$fire.firestore.collection('users').doc(this.userId).set({
          name: null,
        })
      } catch (e) {
        this.$logError(e)
      }
    },
    authWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth.signInWithPopup(provider)
    },
    authWithGithub() {
      const provider = new this.$fireModule.auth.GithubAuthProvider()
      this.$fire.auth.signInWithPopup(provider)
    },
    // async forgotPassword() {
    //   try {
    //     await this.$fire.auth.sendPasswordResetEmail(this.email)
    //   } catch (e) {
    //     this.$logError(e)
    //   }
    // },
  },
}
</script>

<style scoped>
.errors,
.terms {
  width: 240px;
}
</style>
