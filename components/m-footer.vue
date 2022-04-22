<template>
  <footer class="p-3 border-t font-mono text-center">
    <small>
      &copy; Copyright 2022 &nbsp;&nbsp;
      <NuxtLink :to="{ name: 'terms' }">Terms of Service</NuxtLink> &nbsp;&nbsp;
      <NuxtLink :to="{ name: 'privacy-policy' }"> Privacy Policy </NuxtLink>
    </small>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
