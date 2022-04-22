<template>
  <NuxtLink :to="link">
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    link: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>
