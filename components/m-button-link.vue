<template>
  <NuxtLink
    :to="to"
    class="inline-block px-3 rounded-full border-2 border-black hover:text-white hover:bg-black hover:no-underline dark:text-white dark:border-neutral-50 hover:bg-black dark:hover:bg-neutral-50 dark:hover:text-neutral-900"
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
