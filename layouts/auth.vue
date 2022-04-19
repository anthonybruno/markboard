<template>
  <div class="wrap antialiased">
    <div class="push">
      <main>
        <div class="inner">
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

<style scoped>
.wrap {
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  min-height: 100vh;
}
.push {
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
.inner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
