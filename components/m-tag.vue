<template>
  <NuxtLink
    class="inline-block bg-amber-400 hover:bg-amber-500 text-white px-2 rounded hover:no-underline"
    :to="link"
  >
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
