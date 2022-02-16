<template>
  <div class="wrap">
    <div class="inner">
      <main>
        <Nuxt />
      </main>
      <m-footer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Marketing',
}
</script>

<style scoped>
.wrap {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  min-height: 100vh;
}
.inner {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
main {
  flex-grow: 1;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}
</style>
