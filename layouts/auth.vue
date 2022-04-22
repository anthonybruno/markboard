<template>
  <div class="grid grid-cols-2 w-full min-h-screen">
    <header class="flex justify-center items-center border-r">
      <m-logo />
    </header>
    <main class="flex justify-center items-center">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>
