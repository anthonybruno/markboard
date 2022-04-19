<template>
  <footer class="w-full pb-20" :class="{ 'text-center': center }">
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
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
