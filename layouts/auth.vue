<template>
  <div class="container">
    <div class="inner">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
}
</script>

<style scoped>
html,
body {
  min-height: 100vh;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  grid-template-areas: 'inner';
  min-height: 100vh;
}

.inner {
  grid-area: inner;
}
</style>
