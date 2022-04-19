<template>
  <div class="w-full max-w-[650px] mx-auto min-h-screen">
    <div class="flex flex-col min-h-screen justify-center items-center">
      <main class="w-full grow flex justify-center items-center">
        <div class="w-full flex justify-center items-center">
          <Nuxt />
        </div>
      </main>
      <m-footer center />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>
