<template>
  <NuxtLink
    :to="to"
    class="inline-block px-3 rounded-full border-2 border-black hover:text-white hover:bg-black hover:no-underline"
  >
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
}
</script>
